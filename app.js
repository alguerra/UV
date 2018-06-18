var express    = require("express");
var app        = express();
var bodyParser = require('body-parser');
var fs         = require('fs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//Diretorio raiz com paginas estaticas
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 
});

//ENDPOINTS 
var nlu =  require("./nlu.js")(app);
var pdftotext = require("./pdftotext.js")(app);
var imgtotext = require("./imgtotext.js")(app);
var pdftotextbase64 = require("./pdftotextbase64.js")(app);

porta = 8181;
//porta = process.env.PORT;

app.listen(porta, function(){
	console.log("Servidor rodando na porta: " + porta );
});
