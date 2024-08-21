require("dotenv").config({
  path: "./.env.local",
});

module.exports = {
  NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SERVER_URL: process.env.SERVER_URL,

  //   Database
  DB_NAME: process.env.DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
};
