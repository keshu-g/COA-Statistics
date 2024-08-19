const express = require("express");
const constants = require("./constants");
const app  = require("./app");

app.listen(constants.PORT, () => {
  console.log(`
+++ Server Started +++
ENVIRONMENT : ${constants.NODE_ENVIRONMENT} 
PORT        : ${constants.PORT}
URL         : ${constants}
`);
});

app.get("/", (req, res) => res.send(`Sercver is running on port: ${constants.PORT}`));