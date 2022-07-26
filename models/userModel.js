const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 8
          }
    },
    confirm_password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 8
          }
    }
});


User.sync({ force: false});

module.exports = User;