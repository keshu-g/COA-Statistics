const express = require("express");
const router = express.Router();
const { getXp, grindXp } = require("../controllers/xp.controller");
const auth = require("../middlewares/cronAuth");

router.get("/xp", getXp);
router.get("/grindXp", auth, grindXp);
// router.get('/email', emailTest);

module.exports = router;
