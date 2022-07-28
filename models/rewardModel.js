const Sequelize = require("sequelize");
const connection = require("../database/database");
const Classroom = require("./classroomModel");

const Reward = connection.define("rewards", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Classroom.hasMany(Reward);
Reward.belongsTo(Classroom);

module.exports = Reward;