import assert from 'assert'
import { GetUserAnaliseInfo } from '../../modules/analysis/services/GitHubService'

// Estas 3 lineas son necesarias porque al estar el .env fuera de tests, no te lo detecta
import * as dotenv from 'dotenv'
import * as path from 'path'
const githubUsername = 'rwieruch'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
describe(`Call the API to add a new analysis - ${githubUsername} : `, () => {
	it('Should call the API and verify that its the same user', (done: Mocha.Done) => {
		// Aquí invocas tu función que hace la llamada a la API GraphQL
		GetUserAnaliseInfo(githubUsername, process.env.GH_TOKEN)
			.then((data) => {
				// Asumiendo que data tiene una propiedad llamada 'success' que indica si la llamada fue exitosa
				assert.strictEqual(
					data.githubUsername,
					githubUsername,
					'The API call was not successful'
				)
				/*
				 * Si tienes datos específicos que esperas recibir, puedes hacer aserciones sobre ellos aquí
				 * Por ejemplo, si esperas que los datos incluyan un usuario con un nombre específico:
				 * assert(data.user.name === 'Expected Name', 'The received name did not match the expected one');
				 */

				done() // Indica que el test ha terminado
			})
			.catch((err) => {
				done(err) // Si hay un error, lo pasa a Mocha
			})
	})
}).timeout(10000)
