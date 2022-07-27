const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./userModel");
const Classroom = require("./classroomModel");

const Profile = connection.define("profiles", {
    
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

User.belongsToMany(Classroom, { through: Profile });
Classroom.belongsToMany(User, { through: Profile });

Profile.removeAttribute("id");
Profile.sync({ force: false});


module.exports = Profile;