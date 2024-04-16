/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { type Request, type Response } from 'express'
import { connectToMongoDB } from './db/dbConfig'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import AnalysisRouter from './modules/analysis'
import UserRouter from './modules/user'
import HistoryRouter from './modules/history'
import NotificationRouter from './modules/notification'
import ProfessionalExperienceRouter from './modules/professional-experience'
import SubscriptionRouter from './modules/subscriptions'
import TeamCreatorRouter from './modules/team-creator'
import PaymentRouter from './modules/payment'
import cors from 'cors'
import TrendRouter from './modules/trend/'

const app = express()
const swaggerHost = process.env.HOST ?? 'localhost:3000'
app.use(express.json())
app.use(cors())
//Routers -----------------------------------------------------

//Default
app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to the Talent API! 🚀\n See the documentation at /v1/docs')
})
//  Swagger
const swaggerDefinition = {
	info: {
		title: 'IT-Talent backend',
		version: '1.0.0',
		description: 'This is',
	},
	host: swaggerHost,
}
const options = { swaggerDefinition, apis: ['./docs/**/*.yaml'] }
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
app.use(express.json())
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//  Modules Routes ----------------------------------------------
app.use(AnalysisRouter)
app.use(UserRouter)
app.use(HistoryRouter)
app.use(ProfessionalExperienceRouter)
app.use(SubscriptionRouter)
app.use(TeamCreatorRouter)
app.use(NotificationRouter)
app.use(PaymentRouter)
app.use(TrendRouter)

// Server -------------------------------------------------------
connectToMongoDB()
	.then(() => {
		const PORT = process.env.PORT ?? 3000
		app.listen(PORT, () => {
			console.log(`\nExpress server up and running on: http://localhost:${PORT} 🚀`)
			console.log(`API documentation available at: http://localhost:${PORT}/v1/docs 📚`)
			console.log('-'.repeat(50))
		})
	})
	.catch((err: any) => {
		console.log('Error connecting to MongoDB')
		console.log(err)
	})
