const express = require("express");
const app = express();

const path = require('path')

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
 
//Main route
app.get('/', function (req, res) {
    return res.render("index");
});

//Run server
app.listen(8080, () => {
   console.log("Servidor rodando!");
});

module.exports = app;