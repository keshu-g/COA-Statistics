// const Xp = require("../models/xp.model");
const constants = require("../constants");
const { messageResponse } = require("../utils/apiHelper");
const MESSAGE = require("../utils/messages");
const pool = require("../db/postgresql");
const { sendEmail } = require("../utils/emailHelper");
const axios = require("axios");

const getXp = async (req, res) => {
  try {
    let allData = [];

    let data = await sendEmail(
      "spikeisgreen@gmail.com",
      "Cron Started",
      "Started featching data from the server"
    );

    // Loop through 500 pages and collect the data
    for (let page = 1; page <= 500; page++) {
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
      "Cron Started",
      "Started featching data from the server"
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
      return messageResponse(
        MESSAGE.SUCCESS,
        "Data stored successfully",
        null,
        res
      );
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error inserting data:", error.message);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error.message);
    return messageResponse(MESSAGE.SERVER_ERROR, null, null, res);
  }
};

const fetchXpData = async (page) => {
  try {
    const response = await axios.get(
      `https://www.curseofaros.com/highscores-overall.json?p=${page}`
    );

    // Map through the data, add skill names, and remove 'xps'
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
