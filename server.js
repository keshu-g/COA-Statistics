const express = require("express");
const constants = require("./constants");
const app = require("./app");
const pg = require("./db/postgresql");
const {xpGenerator} = require("./utils/helper");

app.listen(constants.PORT, () => {
  console.log(`
+++ Server Started +++
ENVIRONMENT : ${constants.NODE_ENVIRONMENT} 
PORT        : ${constants.PORT}
URL         : ${constants.SERVER_URL}:${constants.PORT}`);
});

app.get("/", (req, res) =>
  res.send(`Sercver is running on port: ${constants.PORT}`)
);

const cron = require('node-cron');

// This will run at 00:00 UTC daily
cron.schedule('0 0 * * *', async () => {
  console.log('Started Running Xp xpGenerator');
  await xpGenerator();
  // Add the code you want to run here
});

