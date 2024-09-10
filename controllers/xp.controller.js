// const Xp = require("../models/xp.model");
const constants = require("../constants");
const { messageResponse } = require("../utils/apiHelper");
const MESSAGE = require("../utils/messages");
const pool = require("../db/postgresql");
const { sendEmail } = require("../utils/emailHelper");
const axios = require("axios");
const {xpGenerator} = require("../utils/helper")

const getXp = async (req, res) => {
  try {
    let data = {
      "name": "keshu",
      "bio": "no xp for you haha"
    }
    // await xpGenerator()
    return messageResponse(MESSAGE.SUCCESS, "xps", data, res);
  } catch (error) {
    console.log(error.message);
    return messageResponse(MESSAGE.SERVER_ERROR, null, null, res);
  }
};

const emailTest = async () => {
  try {
    let data = await sendEmail(
      "kartikgoswami083@gmail.com",
      "testing subject",
      "this is a test email"
    );
    console.log(data);
  } catch (error) {
    console.error("+++ Email testing failed +++");
    console.warn(`Error in email testing: ${error.message}`);
  }
};

module.exports = { getXp, emailTest };
