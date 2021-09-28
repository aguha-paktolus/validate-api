const express = require("express");
const Joi = require("joi");
const dbConn = require("./db/pgdb");
const User = dbConn.User;

// express router object created
const router = express.Router();

//defining routes
router.route("/").get((req, res) => {
  res.send("Hello world");
});

router.route("/user").post((req, res) => {
  
 //defining an object from request body parameters for joi validation
  let reqObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    //zipcode: parseInt(req.body.zipcode),
    zipcode: req.body.zipcode,
  };

  //console.log("req: ", req);
  console.log("reqObj: ", reqObj);

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

  if (valid_res.error) {     //  if validation fails, error is defined, enters if condition
    console.log("validation error: ", valid_res.error.details);
    res.status(422).json({
      message: "Invalid request",
      data: reqObj,
      details: valid_res.error.details,
    });
  } else {                 //  if validation success, error is undefined, enters else condition
    console.log("validation success");
    User.create({
      firstName: reqObj.firstName,
      lastName: reqObj.lastName,
      zipcode: reqObj.zipcode,
    })
      .then((user) => {
        //console.log(user);
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
