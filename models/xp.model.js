const { Schema, model } = require("mongoose");

const players = new Schema({
  un: {
    type: String,
    ref: "users",
  },
  pg: {
    type: Number, // page
  },
  mlx: {
    type: Number, // melee_xp
    default: 0,
  },
  mgx: {
    type: Number, // magic_xp
    default: 0,
  },
  mix: {
    type: Number, // mining_xp
    default: 0,
  },
  smx: {
    type: Number, // smithing_xp
    default: 0,
  },
  wcx: {
    type: Number, // woodcutting_xp
    default: 0,
  },
  cfx: {
    type: Number, // crafting_xp
    default: 0,
  },
  fsx: {
    type: Number, // fishing_xp
    default: 0,
  },
  ckx: {
    type: Number, // cooking_xp
    default: 0,
  },
  tlx: {
    type: Number, // tailoring_xp
    default: 0,
  },
  ttx: {
    type: Number, // total_xp
    default: 0,
  },
  // frx: {
  //   type: Number, // farming_xp
  //   default: 0,
  // },
  // alx: {
  //   type: Number, // alchemy_xp
  //   default: 0,
  // },
  ttl: {
    type: Number, // total_level
    default: 0,
  },
});

const fieldMappings = [
  ["username", "un"],
  ["page", "pg"],
  ["melee_xp", "mlx"],
  ["magic_xp", "mgx"],
  ["mining_xp", "mix"],
  ["smithing_xp", "smx"],
  ["woodcutting_xp", "wcx"],
  ["crafting_xp", "cfx"],
  ["fishing_xp", "fsx"],
  ["cooking_xp", "ckx"],
  ["tailoring_xp", "tlx"],
  ["farming_xp", "frx"],
  ["alchemy_xp", "alx"],
  ["total_xp", "ttx"],
  ["total_level", "ttl"],
];

const createVirtuals = (schema, mappings) => {
  mappings.forEach(([virtualName, fieldName]) => {
    schema
      .virtual(virtualName)
      .get(function () {
        return this[fieldName];
      })
      .set(function (value) {
        this[fieldName] = value;
      });
  });
};
// Automatically create the virtuals
createVirtuals(players, fieldMappings);

const userSchema = new Schema(
  {
    date: {
      type: Date,
      unique: true,
      required: true,
    },
    gamemode: {
      type: String,
      enum: ["NORMAL", "LONEWOLF"],
      default: "NORMAL",
      required: true,
    },
    players: [players],
  },
  {
    timestamps: true,
  }
);

const Xp = model("xp", userSchema);

module.exports = Xp;
