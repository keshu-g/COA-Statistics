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
    
    let xpData = await pool.query("SELECT * FROM xps limit 5")

    let data = {
      "name": "keshu",
      "bio": "no xp for you haha",
      "version" : "0.0.1",
      "xp": xpData.rows
    }
    
    return messageResponse(MESSAGE.SUCCESS, "xps", data, res);
  } catch (error) {
    console.log(error.message);
    return messageResponse(MESSAGE.CUSTOM_ERROR, error, null, res);
  }
};
const grindXp = async (req, res) => {
  try {
    await xpGenerator()
    return messageResponse(MESSAGE.ADD_SUCCESS, "xps", null, res);
  } catch (error) {
    console.log(error.message);
    return messageResponse(MESSAGE.SERVER_ERROR, null, null, res);jh
  }
};


module.exports = { getXp, grindXp };
