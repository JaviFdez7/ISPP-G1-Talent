import assert from 'assert';
import mongoose from 'mongoose';
import { createUser, getAllUser } from '../../modules/user/services/UserService';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { createProfessionalExperience,getAllProfessionalExperience} from '../../modules/professional-experience/services/ProfessionalExperienceService';
import { createTeamCreator, deleteTeamCreator, getAllTeamCreatorOfRepresentative, getTeamCreatorById } from '../../modules/team-creator/services/TeamCreatorService';
import { getHistoryFromUser } from '../../modules/history/services/HistoryService';
import { Candidate, CandidateDocument } from '../../modules/user/models/user';
import { History } from '../../modules/history/models/history';
import { TeamCreator } from '../../modules/team-creator/models/TeamCreatorModel';

dotenv.config({ path: path.resolve(__dirname, '') });

//1º Crear 1 representante genérico
//1º Crear 2 candidatos genéricos
//2º Añadirles experiencias profesionales diferentes
//3º Crear equipo de 1 persona
//4º verificar que el equipo se ha creado y de que esta formado por un candidato con lo buscado

describe('Create correctly a team as a representative', function() {
    let representativeId: any
    const teamData= [
        {
            languages: [
                "Java" 
            ],
            technologies: [
                "react" 
            ],
            yearsOfExperience: 0,
            field: "string" 
        }
    ];

    //INIT
    before(async function(){
        try{
            const representativeData= {
                username: "representative", 
                password: "string", 
                email: "representative@example.com", 
                phone: "+9720817485488", 
                paymentMethods: [
                    "string" 
                ],
                companyName: "string", 
                companySubscription: "Basic plan", 
                projectSocietyName: "string" 
            };
            const representative=await createUser(representativeData,'Representative')
            representativeId=representative._id
            const githubUsers=['andresdominguezruiz','motero2k','RubenCasal']
            const applications=['Web application','Backend','Frontend']
            for(let i=0;i<3;i++){
                const userData = {
                    username: 'candidate'+i,
                    password: "string",
                    email: 'user'+i+'@example.com',
                    phone: "+4617559",
                    paymentMethods: [
                    "string"
                    ],
                    fullName: "string",
                    githubUser: githubUsers[i],
                    profilePicture: "string",
                    candidateSubscription: "Basic plan",
                    CV: "string",
                    residence: "string",
                    lifestyle: "On-site"
                };
                
                const user=await createUser(userData,'Candidate')
                const jobApplication = {
                startDate: "2023-04-05T16:58:45.824+00:00", 
                endDate: "2024-04-05T16:58:45.824+00:00", 
                companyName: "string", 
                professionalArea: applications[i], 
                lifestyle: "On-site",
                location: "string",
                userId: user._id};
                await createProfessionalExperience(jobApplication)
            }
        }catch(error:any){
            console.log(error)
        }
    })

    after(async function(){
        try{
            //VACIAR DB 
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            }
        }catch(error:any){
            console.log(error)
        }
    })

    //VERIFICAR SETUP
    it('should be in db 3 new candidates+1 representative and 3 news professional experiences', async function(){
        try{
            const users=await getAllUser()
            assert.strictEqual(users.length,4)
            const experiences=await getAllProfessionalExperience()
            assert.strictEqual(experiences.length,3)
        }catch(error:any){
            console.log(error)
            
        }
    })

    it('T1-should create a team and add some new histories to the history of the representative', async function (){
        try{
            
            const teams=await getAllTeamCreatorOfRepresentative(representativeId)
            const history=await getHistoryFromUser(representativeId)
            assert.strictEqual(history.length,0)
            assert.strictEqual(teams.length,0)

            await createTeamCreator(teamData,representativeId)
            console.log(representativeId)

            const newTeams=await getAllTeamCreatorOfRepresentative(representativeId)
            const newHistory=await getHistoryFromUser(representativeId)
            assert.strictEqual(newTeams.length,1)
            assert.strictEqual(newTeams[0].profiles.length,1)
            assert.strictEqual(newHistory.length,newTeams[0].profiles[0].recommendedCandidates.length)
        }catch(error:any){
            console.log(error)
        }
        
    })
    it('T2,T9-After create a team, the representative'
    +' should be able to read the analysis of the candidates', async function (){
        try{
            const readableTeam=await TeamCreator.findOne({userId:representativeId})
            const sameTeam=await getTeamCreatorById((readableTeam as any)._id)
            assert.strictEqual((readableTeam as any)._id,sameTeam._id)
            for(var i=0;i<(readableTeam as any).profiles[0].recommendedCandidates.length;i++){
                const candidate=(readableTeam as any).profiles[0].recommendedCandidates[i]
                const candidateDocument = (await Candidate.findOne({
					githubUser: candidate.github_username,
				}).exec()) as CandidateDocument | null
                console.log(candidateDocument)
                const history=await History.findOne({
                    userId:representativeId,
                    analysisId:(candidateDocument as any).analysisId
                })
                assert.notEqual(history,null)
            }
        }catch(error:any){
            console.log(error)
        }
        
    })
    it('T13-Should be able to delete the team', async function (){
        try{
            const readableTeam=await TeamCreator.findOne({userId:representativeId})
            const sameTeam=await getTeamCreatorById((readableTeam as any)._id)
            await deleteTeamCreator(sameTeam._id)
            
            const otherTeams=await getTeamCreatorById(sameTeam._id)
            assert.strictEqual(otherTeams,null)
        }catch(error:any){
            console.log(error)
        }
        
    })


})
