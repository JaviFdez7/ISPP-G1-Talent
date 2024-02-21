import express, { type Request, type Response } from 'express'
import { connectToMongoDB } from './dbConfig'

const app = express()

void connectToMongoDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world from Express in TypeScript!')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Express server up and running on port ${PORT}`)
})
