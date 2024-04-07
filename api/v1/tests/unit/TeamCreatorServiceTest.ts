import assert from 'assert';
import mongoose from 'mongoose';
import { createUser, getAllUser } from '../../modules/user/services/UserService';

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '') });


//1º Crear 1 representante genérico
//1º Crear 2 candidatos genéricos
//2º Añadirles experiencias profesionales diferentes
//3º Crear equipo de 1 persona
//4º verificar que el equipo se ha creado y de que esta formado por un candidato con lo buscado

describe('Create correctly a team as a representative', function() {
    beforeEach( async function(){
        try{
            const githubUsers=['rwieruch','motero2k','RubenCasal']
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
                
                console.log(process.env.GH_TOKEN)
                await createUser(userData,'Candidate')
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

    it('should be in db 3 new candidates', async function(){
        try{
            const users=await getAllUser()
            console.log(users)
            assert.strictEqual(users.lenght,3)
        }catch(error:any){
            console.log(error)
        }
    })
})
