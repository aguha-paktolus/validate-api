const express = require("express");
const Joi = require("joi");
const dbConn = require("./db/pgdb");
const User = dbConn.User;

//importing router
const router = express.Router();

//defining routes

router.route("/").get((req, res) => {
  res.send("Hello world");
});

router.route("/user").post((req, res) => {
  //   const firstName = req.body.firstName;
  //   const lastName = req.body.lastName;
  //   const zipcode = parseInt(req.body.zipcode);

  let reqObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    //zipcode: parseInt(req.body.zipcode),
    zipcode: req.body.zipcode,
  };

  const user_schema = Joi.object()
    .keys({
      firstName: Joi.string().min(4).max(20).required(),
      //middleName: Joi.string(),
      lastName: Joi.string().min(4).max(20).required(),
      //streetAddress: Joi.string().required(),
      zipcode: Joi.number().integer().required(),
    })
    .options({ abortEarly: false });

  const valid_res = user_schema.validate(reqObj);
  //   const valid = typeof(user_schema.error) == 'undefined';

  if (valid_res.error) {
    console.log(valid_res.error.details);
    res.status(422).json({
      message: "Invalid request",
      data: reqObj,
      details: valid_res.error.details,
    });
  } else {
    console.log("validation success");
    User.create({
      firstName: reqObj.firstName,
      lastName: reqObj.lastName,
      zipcode: reqObj.zipcode,
    })
      .then((user) => {
        console.log(user);
        console.log("user details pushed to db");
        //res.send('user details pushed to db');
      })
      .catch((err) => console.log("error in signup: ", err));
    res.status(200).json({
      msg: "validation success",
    });
  }
});

module.exports = router;
