const express = require("express");
const { validCheck, dbData } = require("../controller/controller");

// express router object created
const router = express.Router();

//defining routes
router.route("/").get((req, res) => {
  res.send("Hello world");
});

router.route("/user").post(validCheck, dbData);

module.exports = router;
