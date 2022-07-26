const Sequelize = require("sequelize");
const connection = require("../database/database");
const Classroom = require("./classroomModel");

const Mission = connection.define("missions", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    point: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

Classroom.hasMany(Mission);
Mission.belongsTo(Classroom);

module.exports = Mission;