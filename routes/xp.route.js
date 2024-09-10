const express = require('express');
const router = express.Router();
const { getXp, emailTest } = require('../controllers/xp.controller'); // Importing the getXp function

router.get('/xp', getXp);
// router.get('/email', emailTest);

module.exports = router;
