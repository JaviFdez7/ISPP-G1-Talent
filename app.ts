import express, { type Request, type Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo desde Express en TypeScript!')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`)
})
