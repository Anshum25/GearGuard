import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import { sequelize } from './db/index.js' // Commented out for now

const app = express()

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Allow the frontend origin
        const allowedOrigins = [
            process.env.CORS_ORIGIN || "http://localhost:8080",
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173"
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// Handle preflight requests
app.options('*', cors(corsOptions))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes
// import userRouter from "./routes/user.routes.js" // Commented out for now

// Simple test endpoint
app.post('/api/v1/users/register', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Registration endpoint working (mock)",
        data: {
            user: {
                id: "mock-id",
                email: req.body.email,
                fullName: req.body.fullName,
                role: req.body.role === 'USER' ? 'manager' : 'technician',
                avatar: null
            }
        }
    });
});

app.post('/api/v1/users/login', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login endpoint working (mock)",
        data: {
            user: {
                id: "mock-id",
                email: req.body.email,
                fullName: "Mock User",
                role: 'manager',
                avatar: null
            },
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token"
        }
    });
});

app.post('/api/v1/users/current-user', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Current user endpoint working (mock)",
        data: {
            user: {
                id: "mock-id",
                email: "mock@example.com",
                fullName: "Mock User",
                role: 'manager',
                avatar: null
            }
        }
    });
});

app.post('/api/v1/users/logout', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logout endpoint working (mock)",
        data: {}
    });
});

// test database connection - commented out for now
// app.get('/api/v1/test-db', async (req, res) => {
//     try {
//         await sequelize.authenticate();
//         res.status(200).json({ 
//             success: true, 
//             message: 'Database connection successful!',
//             database: sequelize.getDatabaseName(),
//             dialect: sequelize.getDialect()
//         });
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: 'Database connection failed',
//             error: error.message 
//         });
//     }
// });

// route declaration - commented out for now
// app.use("/api/v1/users", userRouter)

export {app};