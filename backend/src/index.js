// src/index.js
import dotenv from "dotenv";
// import { connectDB } from './db/index.js'; // Commented out for now
// import { connectRedis } from './db/redis.js'; // Commented out for now
import { app } from './app.js';
// import './models/index.js'; // CRITICAL: This executes model definitions and associations - commented out for now

dotenv.config({
    path: './.env'
});

// Connect to Redis first (optional - won't crash if Redis is not available)
// connectRedis();

// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port: ${process.env.PORT || 8000}`);
});