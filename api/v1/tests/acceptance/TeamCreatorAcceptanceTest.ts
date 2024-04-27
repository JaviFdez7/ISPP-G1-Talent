import sinon from 'sinon'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import { EventEmitter } from 'events'
import httpMocks from 'node-mocks-http'
import mockRequire from 'mock-require'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { loginUser } from '../../modules/user/services/UserService'
import * as UserMiddleware from '../../modules/user/middlewares/UserMiddleware'
import * as UserService from '../../modules/user/services/UserService'
import { User } from '../../modules/user/models/user'

import assert from 'assert'
import { ObjectId } from 'mongodb'
import { createTeamCreator } from '../../modules/team-creator/controllers/TeamCreatorController'
import { createUser } from '../../modules/user/services/UserService'
import { checkDataCreateTeam, checkIsRepresentative, checkValidToken } from '../../modules/team-creator/validators/TeamCreatorMiddleware'


describe('As a representative, I want to be prevented from creating a team by not entering my token correctly', function () {
    let representativeToken: any
    let candidateToken: any
	let request: httpMocks.MockRequest<Request>, response: httpMocks.MockResponse<Response>
    let BASE_URL = 'http://localhost:3000'
    let checkers: sinon.SinonSpy
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
                subscriptionType: "Basic plan", 
                projectSocietyName: "string" 
            };
            await createUser(representativeData,'Representative')
            const loggedRepresentative=await loginUser({username: "representative", 
            password: "string"})
            representativeToken=loggedRepresentative.token

            const userData = {
                username: 'candidate'+2,
                password: "string",
                email: 'user'+2+'@example.com',
                phone: "+4617559",
                paymentMethods: [
                "string"
                ],
                fullName: "string",
                githubUser: 'motero2k',
                profilePicture: "string",
                CV: "string",
                residence: "string",
                lifestyle: "On-site"
            };
            
            await createUser(userData,'Candidate')
            const loggedCandidate=await loginUser({username: "candidate2", 
            password: "string"})
            candidateToken=loggedCandidate.token
            
        }catch(error:any){
            console.log(error)
        }
    })
	beforeEach(function () {
		// Crear request y response mocks
		
		response = httpMocks.createResponse({
			eventEmitter: EventEmitter,
		})
	})

	afterEach(function () {
		// Restaurar los stubs a su estado original
		sinon.restore()
		mockRequire.stopAll()
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

	it('should return 400 sending request without token', async function () {
		request = httpMocks.createRequest({
			method: 'POST',
			url: '/team-creator',
            headers:{
                authorization:""
            },
			// Simula lo que necesites en el cuerpo o cabeceras
			body:
				[
                    {
                        languages: [
                          "Java"
                        ],
                        technologies: [
                          "react"
                        ],
                        yearsOfExperience: 0,
                        field: "Backend"
                      }
                ]
		})

        await checkIsRepresentative(request,response)
        console.log(response._getJSONData())
        assert.strictEqual(response.statusCode, 401)
	})

    it('should return 401 sending request with false token', async function () {
		request = httpMocks.createRequest({
			method: 'POST',
			url: '/team-creator',
            headers:{
                authorization:candidateToken
            },
			// Simula lo que necesites en el cuerpo o cabeceras
			body:
				[
                    {
                        languages: [
                          "Java"
                        ],
                        technologies: [
                          "react"
                        ],
                        yearsOfExperience: 0,
                        field: "Backend"
                      }
                ]
		})
        await createTeamCreator(request,response)
        console.log(response._getJSONData())
        assert.strictEqual(response.statusCode, 401)
	})
}).timeout(100000)