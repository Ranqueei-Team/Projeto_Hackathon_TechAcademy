const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
require('./config/passport')(passport);

const path = require('path')
require('dotenv').config();
const { urlencoded } = require("express");

//Use Json format
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuration EJS
app.set("view engine", "ejs");

//Configuratio Static Files
app.use(express.static("public"));
app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
 
//Models
const User = require("./models/userModel");
const Classroom = require("./models/classroomModel");

//Database connection
const connection = require("./database/database");

//Start database connection
connection.authenticate()
    .then( () => {
        console.log("Conexão estabelecida com sucesso!");
    }).catch( (error) => {
        console.log("Erro ao conectar o banco de dados:", error);
});

//Main route
app.get('/', function (req, res) {
    return res.render("index");
});

//Session 
app.use(
    session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
   })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Flash middleware
app.use(flash());

// Global variables middleware
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
const usersRoute = require("./routes/usersRoute");
app.use("/users/", usersRoute);
const managerRoute = require("./routes/managerRoute");
app.use("/manager/", managerRoute);

//Run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;