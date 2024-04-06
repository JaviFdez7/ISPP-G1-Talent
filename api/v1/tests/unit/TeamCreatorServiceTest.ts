import assert from 'assert';
import { ObjectId } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// ------DB FOR TESTING--------
let mongoServer: MongoMemoryServer
before(async () => {
	mongoServer = await MongoMemoryServer.create()
	const mongoUri = mongoServer.getUri()
	await mongoose.connect(mongoUri)
})
after(async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
})
// ------DB FOR TESTING--------

//1º Crear 1 representante genérico
//1º Crear 2 candidatos genéricos
//2º Añadirles experiencias profesionales diferentes
//3º Crear equipo de 1 persona
//4º verificar que el equipo se ha creado y de que esta formado por un candidato con lo buscado

describe('Create correctly a team as a representative', function() {
    beforeEach(function(){
        const githubUsers=['andresdominguezruiz','motero2k','albdomrui20']
        const userData = {
            username: "string",
            password: "string",
            email: "user@example.com",
            phone: "+4617559",
            paymentMethods: [
              "string"
            ],
            fullName: "string",
            githubUser: "string",
            profilePicture: "string",
            candidateSubscription: "Basic plan",
            CV: "string",
            residence: "string",
            lifestyle: "On-site",
            githubToken: "string"
          };
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
})
