require("dotenv").config({
  path: "./.env.local",
});

module.exports = {
  NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SERVER_URL: process.env.SERVER_URL,

  // Email
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  //   Database
  DB_NAME: process.env.DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  
  PG_URI: process.env.PG_URI,
  PG_HOSTNAME: process.env.PG_HOSTNAME,
  PG_DBNAME: process.env.PG_DBNAME,
  PG_USERNAME: process.env.PG_USERNAME,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_PORT: process.env.PG_PORT,
};
