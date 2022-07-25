const Sequelize = require("sequelize");
const connection = require("../database/database");

const Mission = connection.define("missions", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    point: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }
});


//Mission.sync({ force: true});

module.exports = Mission;