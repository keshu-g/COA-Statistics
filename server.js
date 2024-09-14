const express = require("express");
const constants = require("./constants");
const app = require("./app");
const pool = require("./db/postgresql");

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

