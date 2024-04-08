import assert from 'assert';
import mongoose from 'mongoose';
import { createUser, getAllUser, getUserById } from '../../modules/user/services/UserService';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { createProfessionalExperience,getAllProfessionalExperience} from '../../modules/professional-experience/services/ProfessionalExperienceService';
import { createTeamCreator, getAllTeamCreatorOfRepresentative } from '../../modules/team-creator/services/TeamCreatorService';
import { getAnalysisByGitHubUsername, getAnalysisById } from '../../modules/analysis/services/AnalysisService';


//1º Crear un análisis como un candidato

describe('Create correctly an analysis as a candidate',function(){
    let representativeId;
    let githubusername: string;
    let candidateId:any ;
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
            githubusername='rwieruch'

            const userData = {
                username: 'candidate',
                password: "string",
                email: 'user@example.com',
                phone: "+4617559",
                paymentMethods: [
                "string"
                ],
                fullName: "string",
                githubUser:githubusername,
                profilePicture: "string",
                candidateSubscription: "Basic plan",
                CV: "string",
                residence: "string",
                lifestyle: "On-site"
            };
            const user=await createUser(userData,'Candidate')
            candidateId = user._id
  
        }catch(error:any){
            console.log(error)
        }
    })
    
    it('should be an analysis of the new user', async function(){
        try{
            const user = await getUserById(candidateId);
            const analysis = await getAnalysisByGitHubUsername(user.githubUser)
      
            assert.notEqual(analysis,undefined);

        }catch(error:any){
            console.log(error)
        }
    })

    
});
