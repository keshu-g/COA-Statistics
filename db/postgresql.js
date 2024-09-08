const { Pool } = require("pg");
const {
  PG_DBNAME,
  PG_PORT,
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOSTNAME,
} = require("../constants");

const pool = new Pool({
  user: PG_USERNAME,
  host: PG_HOSTNAME,
  database: PG_DBNAME,
  password: PG_PASSWORD,
  port: PG_PORT,
});

// Function to test and ensure the connection is established
const connectPostgres = async () => {
  try {
    // Check connection by querying the database
    await pool.query("SELECT 1");
    console.log("+++ PostgreSQL connected +++");
  } catch (err) {
    console.error("+++ PostgreSQL connection failed +++");
    console.warn(`Error in PostgreSQL connection: ${err.message}`);
  }
};

connectPostgres();

const testQueries = async () => {
  try {
    // Check connection by querying the database
    let data = await pool.query(`
select *
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='xps'
      `);

    console.log("Dtaa : ", data.rows);
    console.log("+++ PostgreSQL connected +++");
  } catch (err) {
    console.error("+++ PostgreSQL connection failed +++");
    console.warn(`Error in PostgreSQL connection: ${err.message}`);
  }
};

// testQueries();

module.exports = pool;
