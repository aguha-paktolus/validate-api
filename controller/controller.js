const Joi = require("joi");

//importing sequelize model/table User from pgdb in model folder
const { User } = require("../model/pgdb");

const validCheck = function (req, res, next) {
  console.log("in validCheck");
  console.log("req.body in validCheck: ", req.body);

  //defining joi schema to validate incoming req.body data

  const userSchema = Joi.object()
    .keys({
      firstName: Joi.string().min(4).max(20).required(),

      middleName: Joi.string().min(4).max(20),

      lastName: Joi.string().min(4).max(20).required(),

      streetAddress: Joi.string().required(),

      unit: Joi.number().integer(),

      city: Joi.string().required(),

      state: Joi.string()
        .valid(
          "Andaman and Nicobar Islands",
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chandigarh",
          "Chhattisgarh",
          "Dadra and Nagar Haveli",
          "Daman and Diu",
          "Delhi",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jammu and Kashmir",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Lakshadweep",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Puducherry",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal"
        )
        .required(),

      zipCode: Joi.number().integer().min(000000).max(999999).required(),

      phoneNumber: Joi.number().integer().required(),

      emailAddress: Joi.string().email().required(),

      preferredDeductible: Joi.string()
        .valid("1000", "1500", "2000", "2500", "3000")
        .required(),

      dateOfBirth: Joi.string().min(10).max(100).required(),

      residencyStatus: Joi.string().valid("Primary", "Secondary"),

      industry: Joi.string()
        .valid(
          "Accounting",
          "Administration & Office Support",
          "Construction",
          "Consulting & Strategy",
          "Design & Architechture",
          "Engineering",
          "Government & Defence",
          "Healthcare & Medical",
          "Information & Communication Technology",
          "Mining, Resources & Energy",
          "Real Estate & Property",
          "Science & Technology",
          "Trades & Services"
        )
        .required(),

      occupation: Joi.string()
        .valid(
          "Government Service",
          "Private Service",
          "Artist",
          "Entrepreneur",
          "Agriculture",
          "Business",
          "Social Worker"
        )
        .required(),

      education: Joi.string()
        .valid(
          "matriculate",
          "Intermediate",
          "Graduation",
          "Post Graduation",
          "PhD"
        )
        .required(),

      houseType: Joi.string().valid("House", "Condo", "HO5"),
    })
    .options({ abortEarly: false });

  // using req.body data to validate against joi schema
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

  //create model instance or table row using validated req.body data
  User.create({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    unit: req.body.unit,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    preferredDeductible: req.body.preferredDeductible,
    dateOfBirth: req.body.dateOfBirth,
    residencyStatus: req.body.residencyStatus,
    industry: req.body.industry,
    occupation: req.body.occupation,
    education: req.body.education,
    houseType: req.body.houseType,
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
