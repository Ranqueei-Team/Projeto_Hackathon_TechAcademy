const Sequelize = require("sequelize");
const sequelize = require("../database/database")

//Create tables
sequelize.sync({ force: false })

//Force recreate tables
//sequelize.sync({ force: true })

