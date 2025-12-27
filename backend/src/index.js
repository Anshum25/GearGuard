// src/index.js
import dotenv from "dotenv";
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port: ${process.env.PORT || 8000}`);
});