import assert from 'assert';
import mongoose from 'mongoose';
import { createUser, getAllUser } from '../../modules/user/services/UserService';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { createProfessionalExperience,getAllProfessionalExperience} from '../../modules/professional-experience/services/ProfessionalExperienceService';
import { createTeamCreator, getAllTeamCreatorOfRepresentative } from '../../modules/team-creator/services/TeamCreatorService';
dotenv.config({ path: path.resolve(__dirname, '') });


//1º Crear 1 representante genérico
//1º Crear 2 candidatos genéricos
//2º Añadirles experiencias profesionales diferentes
//3º Crear equipo de 1 persona
//4º verificar que el equipo se ha creado y de que esta formado por un candidato con lo buscado

describe('Create correctly a team as a representative', function() {
    let representativeId: any
    beforeEach( async function(){
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
            const githubUsers=['rwieruch','motero2k','RubenCasal']
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

    afterEach(async function(){
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

    it('should create a team with one of the candidate', async function (){
        try{
            const teamData= [
                {
                    languages: [
                        "Java" // Mapeado directamente de tu input
                    ],
                    technologies: [
                        "react" 
                    ],
                    yearsOfExperience: 0,
                    field: "string" 
                }
            ];
            await createTeamCreator(teamData,representativeId)
            const teams=await getAllTeamCreatorOfRepresentative(representativeId)
            assert.strictEqual(teams.length,1)
            assert.strictEqual(teams[0].profiles.length,1)
        }catch(error:any){
            console.log(error)
        }
        
    })

})
