const express = require("express");
const app = express();

const path = require('path'
)
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

//Run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;