const Xp = require("../models/xp.model");
const constants = require("../constants");
const { messageResponse } = require("../utils/apiHelper");
const MESSAGE = require("../utils/messages");

const getXp = async (req, res) => {
  try {
    let data = fetch(
        
    )
  } catch (error) {
    console.log(error.message);
    return messageResponse(MESSAGE.SERVER_ERROR, null, null, res);
  }
};
