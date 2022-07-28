const Sequelize = require("sequelize");
const connection = require("../database/database");
const Classroom = require("./classroomModel");

const Team = connection.define("teams", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

Classroom.hasMany(Team);
Team.belongsTo(Classroom);

module.exports = Team;