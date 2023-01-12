const express = require("express");
const router = express.Router();
const testCtr = require("../controllers/controller");



router.get("/testMessage", testCtr.test);
module.exports = router;
