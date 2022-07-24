const Sequelize = require("sequelize");
require('dotenv').config();

const DATABASE= process.env.DATABASE;
const USER_DATABASE = process.env.USER_DATABASE;
const PASSWORD_DATABASE = process.env.PASSWORD_DATABASE;

const sequelize = new Sequelize(DATABASE, USER_DATABASE, PASSWORD_DATABASE, {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
});

module.exports = sequelize;