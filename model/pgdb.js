const { Sequelize } = require("sequelize");
const dbConfig = require("./db.config");

//initializing sequelize object, giving postgres configuration values from db.config file
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

//checking database connection using sequelize.authenticate()
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//defining model/table structure using sequelize.define
const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  //   middleName: {
  //     type: Sequelize.STRING,
  //     //allowNull: false,
  //   },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  //   streetAddress: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //   },

  //   unit: {
  //     type: Sequelize.INTEGER,
  //     //allowNull: false,
  //   },

  //   city: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //   },

  //   state: {
  //     type: Sequelize.ENUM(""),
  //     allowNull: false,
  //   },

  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  //   phoneNumber: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //   },

  //   emailAddress: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //   },

  //   preferredDeductible: {
  //     type: Sequelize.ENUM(""),
  //     allowNull: false,
  //   },

  //   dateOfBirth: {},

  //   residencyStatus: {
  //     type: Sequelize.ENUM(""),
  //     //allowNull: false,
  //   },

  //   industry: {
  //     type: Sequelize.ENUM(""),
  //     allowNull: false,
  //   },

  //   occupation: {
  //     type: Sequelize.ENUM(""),
  //     allowNull: false,
  //   },

  //   education: {
  //     type: Sequelize.ENUM(""),
  //     allowNull: false,
  //   },

  //   houseType: {
  //     type: Sequelize.ENUM("House", "Condo", "HO5"),
  //     allowNull: false,
  //   },
});

//Model synchronization using sequelize.sync. retue
sequelize
  .sync()
  .then(() => console.log("users table has been successfully created"))
  .catch((error) => console.log(error));

module.exports = {
  User,
};
