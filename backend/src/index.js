// src/index.js
import dotenv from "dotenv";
import { connectDB } from './db/index.js';
import { app } from './app.js';
import './models/index.js'; // CRITICAL: This executes model definitions and associations

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    app.on("error", (error) => console.log(error));
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    });
})
.catch((e) => console.error("PostgreSQL connection failed!!!", e));