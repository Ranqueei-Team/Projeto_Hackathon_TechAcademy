const Sequelize = require("sequelize");
const connection = require("../database/database");

const Classroom = connection.define("classrooms", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Classroom;