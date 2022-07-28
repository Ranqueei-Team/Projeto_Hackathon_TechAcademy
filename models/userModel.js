const Sequelize = require("sequelize");
const connection = require("../database/database");
const Classroom = require("./classroomModel");

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
    },
    current_class: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'classrooms', key: 'id' }
    }
});

module.exports = User;