// src/index.js
import dotenv from "dotenv";
import { app } from './app.js';
import { connectDB } from './db/index.js';
// Import models to ensure they are registered with Sequelize before sync
import './models/index.js';

dotenv.config({
    path: './.env'
});

// Initialize database connection
connectDB().then(() => {
    // Start server after database connection is established
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
}).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});