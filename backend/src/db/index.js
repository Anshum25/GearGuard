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
        
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
        process.exit(1);
    }
}

export { sequelize, connectDB };