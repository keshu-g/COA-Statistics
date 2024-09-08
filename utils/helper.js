const {
  isValidObjectId,
  Types: { ObjectId },
} = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../constants");
const path = require("path");
const fs = require("fs");

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "object" &&
    Object.values(value).every((val) =>
      isValidObjectId(val) ? isEmpty(val.toString()) : isEmpty(val)
    ));

const toObjectId = (entryId) => {
  if (Array.isArray(entryId)) {
    return entryId.map((entryId) => new ObjectId(entryId));
  }

  return new ObjectId(entryId);
};

const encrypt = async (value, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  let output = await bcrypt.hash(value, salt);
  return output;
};

const generatePassword = (
  length = 8,
  useNumbers = true,
  useLowercase = true,
  useUppercase = true,
  useSpecialChars = true
) => {
  const numbers = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characterPool = "";

  if (useNumbers) characterPool += numbers;
  if (useLowercase) characterPool += lowercase;
  if (useUppercase) characterPool += uppercase;
  if (useSpecialChars) characterPool += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
};

module.exports = { isEmpty, toObjectId, encrypt, generatePassword };
