import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRouter from './routes/index.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1', indexRouter)


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})