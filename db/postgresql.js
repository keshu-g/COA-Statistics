const { Sequelize } = require('sequelize');
const { PG_URI } = require('../constants');

const sequelize = new Sequelize(PG_URI, {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('+++ Postgres connected +++');
  } catch (err) {
    console.error('+++ Postgres connection failed +++');
    console.warn(`Error in PostgreSQL connection: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = sequelize;