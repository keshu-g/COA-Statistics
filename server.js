const express = require("express");
const constants = require("./constants");
const app = require("./app");
const pool = require("./db/postgresql");

let serverURL = constants.NODE_ENVIRONMENT === "production" ? constants.SERVER_URL : `http://localhost:${constants.PORT}`;

let logString = `
+++ Server Started +++
ENVIRONMENT : ${constants.NODE_ENVIRONMENT} 
PORT        : ${constants.PORT}
URL         : ${serverURL}
`

app.listen(constants.PORT, () => {
  console.log(logString);
});

app.get("/", (req, res) =>
  res.send(`Sercver is running on port: ${constants.PORT}`)
);

