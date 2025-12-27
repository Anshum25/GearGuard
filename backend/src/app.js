import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sequelize } from './db/index.js'

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.routes.js"

// test database connection
app.get('/api/v1/test-db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({ 
            success: true, 
            message: 'Database connection successful!',
            database: sequelize.getDatabaseName(),
            dialect: sequelize.getDialect()
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Database connection failed',
            error: error.message 
        });
    }
});

// route declaration
app.use("/api/v1/users", userRouter)

export {app};