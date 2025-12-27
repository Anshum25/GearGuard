import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock endpoints
app.post('/api/v1/users/register', (req, res) => {
    console.log('Register request:', req.body);
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
    console.log('Login request:', req.body);
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Simple server running on port ${PORT}`);
});
