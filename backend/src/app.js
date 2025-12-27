import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sequelize } from './db/index.js'

const app = express()

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.routes.js"

// route declaration
app.use("/api/v1/users", userRouter)

export {app};