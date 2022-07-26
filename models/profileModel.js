const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./userModel");
const Classroom = require("./classroomModel");

const Profile = connection.define('profiles', {
    classroomId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Classroom, // 'Movies' would also work
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: User, // 'Actors' would also work
        key: 'id'
      }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
 
Profile.sync({ force: false});
Profile.removeAttribute("id");

module.exports = Profile;