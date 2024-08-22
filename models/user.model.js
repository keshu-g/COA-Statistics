const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gamemode: {
      type: String,
      enum: ["NORMAL", "LONEWOLF"],
      default: "NORMAL",
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "NOT_VERIFIED", "BANNED"],
      default: "NOT_VERIFIED",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("users", userSchema);

module.exports = User;