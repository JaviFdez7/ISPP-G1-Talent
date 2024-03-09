import sinon from 'sinon';
import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import httpMocks from 'node-mocks-http';
import mockRequire from 'mock-require';

import { loginUser } from '../../modules/user/controllers/UserController';
import * as UserMiddleware from '../../modules/user/middlewares/UserMiddleware';
import * as UserService from '../../modules/user/services/UserService';
import {User} from '../../modules/user/models/user';

import assert from 'assert';


const userMock = {
  findOne: sinon.stub().returns({
    exec: sinon.stub().resolves({ username: 'testUser', password: 'hashedPassword' }) // Ajusta según tus necesidades
  })
};
mockRequire('../../modules/user/models/user', {userMock});


describe('loginUser Function Tests', function() {
  let request: httpMocks.MockRequest<Request>, response: httpMocks.MockResponse<Response>;
  let checkLoginUserStub: sinon.SinonStub, loginUserStub: sinon.SinonStub;

  beforeEach(function() {
    // Crear request y response mocks
    request = httpMocks.createRequest();
    response = httpMocks.createResponse({
      eventEmitter: EventEmitter
    }) as httpMocks.MockResponse<Response>;

    // Inicializar stubs para las funciones externas
    checkLoginUserStub = sinon.stub(UserMiddleware, 'checkLoginUser');
    loginUserStub = sinon.stub(UserService, 'loginUser');

  
  });

  afterEach(function() {
    // Restaurar los stubs a su estado original
    sinon.restore();
    mockRequire.stopAll();
  });

  it('should return 200 and the user data on successful login', async function() {
    const expectedData = { token: 'fake-token', user: 'fake-user' };
    userMock.findOne.returns({ username: 'fake-user', password: 'hashedPassword' });
    checkLoginUserStub.resolves({});
    loginUserStub.resolves(expectedData);

    await loginUser(request, response);

    const responseData = response._getData();
    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(responseData, expectedData);
  });

}).timeout(100000);