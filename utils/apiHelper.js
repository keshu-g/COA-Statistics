const { isEmpty } = require("./helper");

const messageResponse = async ([statusCode, msg], item, data, res) => {
  const message = msg.replace(new RegExp(":item", "g"), item);
  const success = statusCode < 400;
  const response = {
    success,
    message,
  };

  if (!isEmpty(data)) {
    response["data"] = data;
  }

  if (res) {
    return res.status(statusCode).json(response);
  }
  return response;
};

module.exports = { messageResponse };
