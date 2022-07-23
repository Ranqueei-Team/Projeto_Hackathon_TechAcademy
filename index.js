const express = require("express");
const app = express();

const { urlencoded } = require("express");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(8080, () => {
   console.log("Servidor rodando!");
});


module.exports = app;