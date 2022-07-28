const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./userModel");
const Team = require("./teamModel");

const UserTeam = connection.define("users_teams", {
});

User.belongsToMany(Team, { through: UserTeam });
Team.belongsToMany(User, { through: UserTeam });

UserTeam.removeAttribute("id");

module.exports = UserTeam;