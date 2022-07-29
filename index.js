const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path')
require('./config/passport')(passport);

//Express
const app = express();

//Env file configuration
require('dotenv').config();
const { urlencoded } = require("express");

//Use Json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//EJS configuration
app.set("view engine", "ejs");

//Static Files Configuration
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
 
//Models
const databaseMigrations = require("./database/syncDatabase")
const User = require("./models/userModel");
const Classroom = require("./models/classroomModel");
const Mission = require("./models/missionModel");
const Reward = require("./models/rewardModel");
const Team = require("./models/teamModel");
const Profile = require("./models/profileModel");
const UserTeam = require("./models/userTeamModel");

//Database connection
const connection = require("./database/database");

//Start database connection
connection.authenticate()
    .then( () => {
        console.log("Conexão estabelecida com sucesso!");
    }).catch( (error) => {
        console.log("Erro ao conectar o banco de dados:", error);
});

//Session configuration
app.use(
    session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
   })
);

//Passport middleware configuration
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Current User
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
  })

//Flash middleware
app.use(flash());

//Global variables middleware
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Main route configuration
app.get('/', function (req, res) {
    return res.render("index");
});

const Sequelize = require("sequelize");
const sequelize = require("./database/database")
app.use(function(req,res,next){
    if (req.user && req.user.current_classroom){
        async function checkProfile () {
            const { QueryTypes } = require('sequelize');
      
            const profile = await sequelize.query("SELECT type FROM profiles where profiles.classroomId = ? and profiles.userId = ? limit 1",{
            replacements: [req.user.current_classroom, req.user.id],
            type: QueryTypes.SELECT,
            })
            res.locals.profileUser = profile[0].type
    }
    checkProfile();}
   
    next();
})
//Routes
const usersRoute = require("./routes/usersRoute");
app.use("/users/", usersRoute);
const managerRoute = require("./routes/managerRoute");
app.use("/manager/", managerRoute);
const classroomsRoute = require("./routes/classroomsRoute");
app.use("/classrooms/", classroomsRoute);
const missionsRoute = require("./routes/missionsRoute");
app.use("/missions/", missionsRoute);
const rewardsRoute = require("./routes/rewardsRoute");
app.use("/rewards/", rewardsRoute);
const teamsRoute = require("./routes/teamsRoute");
app.use("/teams/", teamsRoute);

//Run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;