import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import mockRequire from 'mock-require';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { loginUser } from '../../modules/user/controllers/UserController';
import * as UserMiddleware from '../../modules/user/middlewares/UserMiddleware';
import * as UserService from '../../modules/user/services/UserService';
import {User} from '../../modules/user/models/user';

import assert from 'assert';
import { ObjectId } from 'mongodb';




//------DB FOR TESTING--------
let mongoServer: MongoMemoryServer;
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
//------DB FOR TESTING--------

const hashedPass=bcrypt.hash('fake-password', 10)
describe('loginUser Function Tests', function() {
  let request: httpMocks.MockRequest<Request>, response: httpMocks.MockResponse<Response>;
  let checkLoginUserStub: sinon.SinonStub, loginUserStub: sinon.SinonStub;
  let findOneStub:sinon.SinonStub;

  beforeEach(function() {
    // Crear request y response mocks
    request = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      // Simula lo que necesites en el cuerpo o cabeceras
      body: {
        username: 'fake-user',
        password: 'fake-password'
      }
    });
    response = httpMocks.createResponse({
      eventEmitter: EventEmitter
    }) as httpMocks.MockResponse<Response>;

    // Inicializar stubs para las funciones externas
    findOneStub = sinon.stub(User, 'findOne').withArgs({ username: 'fake-user' }).resolves({
      username: 'fake-user',
      password: hashedPass, // Asume que esta es la contraseña hasheada
    });
    checkLoginUserStub = sinon.stub(UserMiddleware, 'checkLoginUser');
    loginUserStub = sinon.stub(UserService, 'loginUser').resolves({
      token: 'fake-token',
      user: 'fake-user'
    });

  
  });

  afterEach(function() {
    // Restaurar los stubs a su estado original
    sinon.restore();
    mockRequire.stopAll();
  });

  it('should return 200 and the user data on successful login', async function() {
    const hashedPass=await bcrypt.hash('fake-password', 10)
    const fakeUserId = new mongoose.Types.ObjectId();
    console.log(hashedPass)
    findOneStub.resolves({_id:fakeUserId,username:'fake-user',password:hashedPass})
    checkLoginUserStub.resolves({});
    loginUserStub.resolves({ username: 'fake-user' });
    
    // Ejecuta la función bajo prueba
    await loginUser(request, response);

    assert.strictEqual(response.statusCode, 200);
    const responseData = response._getData();
    assert.deepStrictEqual(responseData.user.username,'fake-user');
  });

}).timeout(100000);