const express = require("express");
const cors = require("cors");
const constants = require("./constants");

const app = express();

app.use(cors({ credentials: true, origin: constants.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const xpRoutes = require('./routes/xp.route');

app.use('/api', xpRoutes);

module.exports = app;
