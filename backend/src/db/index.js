import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.PG_DB_NAME || 'test1',
    process.env.PG_USER || 'postgres',
    process.env.PG_PASSWORD || 'password',
    {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || 5432,
        dialect: 'postgres',
        logging: console.log
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connection established successfully');
        
        // Sync database - this will create tables if they don't exist or alter them if they do
        // Models should be imported before this function is called
        await sequelize.sync({ alter: true });
        console.log('Database synchronized - all tables are ready');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
        console.error('Error details:', error.message);
        process.exit(1);
    }
}

export { sequelize, connectDB };