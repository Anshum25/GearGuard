import { sequelize } from './src/db/index.js';

async function checkTables() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    // Get all tables
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('All tables found by Sequelize:', tables);
    
    // Check specific table with raw SQL
    const [results] = await sequelize.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );
    console.log('Tables in public schema:', results.map(r => r.table_name));
    
    // Try to query the Users table specifically
    try {
      const [userResults] = await sequelize.query('SELECT COUNT(*) FROM "Users"');
      console.log('Users table count:', userResults);
    } catch (err) {
      console.log('Error querying Users table:', err.message);
    }
    
    // Try lowercase users
    try {
      const [userResults] = await sequelize.query('SELECT COUNT(*) FROM users');
      console.log('users table count:', userResults);
    } catch (err) {
      console.log('Error querying users table:', err.message);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkTables();
