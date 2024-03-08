"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const githubUsername = 'rwieruch';
const GitHubService_1 = require("../../api/v1/modules/analysis/services/GitHubService");
//Estas 3 lineas son necesarias porque al estar el .env fuera de tests, no te lo detecta
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({ path: path.resolve(__dirname, '../../api/v1/.env') });
describe(`Call the API to add a new analysis - ${githubUsername} : `, () => {
    it('Should call the API and verify that its the same user', (done) => {
        // Aquí invocas tu función que hace la llamada a la API GraphQL
        (0, GitHubService_1.GetUserAnaliseInfo)(githubUsername, process.env.GH_TOKEN)
            .then(data => {
            // Asumiendo que data tiene una propiedad llamada 'success' que indica si la llamada fue exitosa
            assert_1.default.strictEqual(data.githubUsername, githubUsername, 'The API call was not successful');
            // Si tienes datos específicos que esperas recibir, puedes hacer aserciones sobre ellos aquí
            // Por ejemplo, si esperas que los datos incluyan un usuario con un nombre específico:
            // assert(data.user.name === 'Expected Name', 'The received name did not match the expected one');
            done(); // Indica que el test ha terminado
        })
            .catch(err => {
            done(err); // Si hay un error, lo pasa a Mocha
        });
    });
});
