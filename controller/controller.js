const Joi = require("joi");
const dbConn = require("../model/pgdb");
const User = dbConn.User;

const validCheck = function (req, res, next) {
  //defining an object from request body parameters for joi validation
  //   let reqObj = {
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     //zipcode: parseInt(req.body.zipcode),
  //     zipcode: req.body.zipcode,
  //   };

  console.log("in validCheck");
  console.log("req.body in validCheck: ", req.body);

  const userSchema = Joi.object()
    .keys({
      firstName: Joi.string().min(4).max(20).required(),
      lastName: Joi.string().min(4).max(20).required(),
      zipCode: Joi.number().integer().min(000000).max(999999).required(),
    })
    .options({ abortEarly: false });

  const validRes = userSchema.validate(req.body);
  console.log("validRes: ", validRes);

  if (validRes.error) {
    //  if validation fails, error is defined, enters if condition

    console.log("validation error: ", validRes.error.details);
    res.status(422).json({
      message: "Invalid request",
      data: req.body,
      details: validRes.error.details,
    });
  } else {
    //  if validation success, error is undefined, enters else condition, for data strorage in db
    next(); 
  }
};

function dbData(req, res) {
  console.log("in dbData, validation success");
  console.log("req.body in dbData: ", req.body);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    zipCode: req.body.zipCode,
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

module.exports = { validCheck, dbData };
