const {
  isValidObjectId,
  Types: { ObjectId },
} = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../constants");
const path = require("path");
const fs = require("fs");
const { sendEmail } = require("./emailHelper");
const pool = require("../db/postgresql");
const axios = require("axios");

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

const fetchXpData = async (page) => {
  try {
    const response = await axios.get(
      `https://www.curseofaros.com/highscores-overall.json?p=${page}`
    );

    const dataWithSkills = response.data.map((player) => ({
      username: player.name,
      total_xp: player.xp,
      total_level: player.total_level,
      skills: {
        Meele: player.xps[0],
        Magic: player.xps[1],
        Mining: player.xps[2],
        Smithing: player.xps[3],
        WoodCutting: player.xps[4],
        Crafting: player.xps[5],
        Fishing: player.xps[6],
        Cooking: player.xps[7],
        Tailor: player.xps[8],
        Farming: player.xps[9],
        Alchemy: player.xps[10],
      },
    }));

    return dataWithSkills; // Return the transformed data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch data");
  }
};

const xpGenerator = async () => {
  let allData = [];

  await sendEmail(
    "spikeisgreen@gmail.com",
    "Cron Started " + new Date(),
    `
    Hi sir

    we started the cron job

    will soon notify you when it's done
    `
  );

  // Loop through 500 pages and collect the data
  let pageLimit = 1;
  for (let page = 0; page <= pageLimit; page++) {
    console.log(`Fetching data from page ${page}`);
    const pageData = await fetchXpData(page);
    allData = allData.concat(pageData);
  }

  // Transform data to match the database columns
  const transformedData = allData.map((player) => [
    `'${player.username}'`,
    player.total_level,
    player.skills.Meele || 0,
    player.skills.Magic || 0,
    player.skills.Mining || 0,
    player.skills.Smithing || 0,
    player.skills.WoodCutting || 0,
    player.skills.Crafting || 0,
    player.skills.Fishing || 0,
    player.skills.Cooking || 0,
    player.skills.Tailor || 0,
    player.skills.Farming || 0,
    player.skills.Alchemy || 0,
  ]);
  await sendEmail(
    "spikeisgreen@gmail.com",
    "Uploading - " + new Date(),
    `
    Hello sir

    we started uploading data to the database

    we have about ${transformedData.length} players
    `
  );
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const batchSize = 500;
    for (let i = 0; i < transformedData.length; i += batchSize) {
      console.log(
        `Batch ${i / batchSize + 1} of ${Math.ceil(
          transformedData.length / batchSize
        )}`
      );
      const batch = transformedData.slice(i, i + batchSize);

      const values = batch.map((row) => `(${row.join(",")})`).join(",");

      const query = `
          INSERT INTO xps (username, total_level, melee_xp, magic_xp, mining_xp, smithing_xp, woodcutting_xp, crafting_xp, fishing_xp, cooking_xp, tailoring_xp, farming_xp, alchemy_xp)
          VALUES ${values}
          ON CONFLICT DO NOTHING;`;

      await client.query(query);
    }

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting data:", error.message);
    await sendEmail(
      "spikeisgreen@gmail.com",
      "Error - " + new Date(),
      `
      Hello sir
      
      we are so sorry you have to face this but

      we failed to upload the data to the database

      error is ${error.message}
      `
    );
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  isEmpty,
  toObjectId,
  encrypt,
  generatePassword,
  xpGenerator,
};
