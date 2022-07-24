const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});


//User.sync({ force: false});

module.exports = User;