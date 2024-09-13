// add a middleware for vercel cron job
const constants = require("../constants");
const { messageResponse } = require("../utils/apiHelper");
const MESSAGE = require("../utils/messages");

const auth = (req, res, next) => {
  if (req.headers.authorization !== `Bearer ${constants.CRON_SECRET}`) {
    return messageResponse(MESSAGE.FORBIDDEN, null, null, res);
  }

  next();
};

module.exports = auth;
