var util = require("./util.js");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require("fs");
const { exec } = require('child_process');



module.exports = function(app) {
	app.post("/pdftotext", upload.single('arquivo'), function(req,res){
       
     if(req.file.path) {  		      
          
          arquivoTemp = Math.floor((Math.random() * 100000) + 1).toString();
          arquivo = req.file.path;
          
          // Salva em arquivo txt
          exec('pdftotext -layout ' + arquivo + ' ' + arquivoTemp, (err, stdout, stderr) => {
            if (err) {
              // node couldn't execute the command
              console.log(err)
              return;
            } 
            fs.readFile(arquivoTemp,  function(err, resultado){
              if(err){
                console.log("erro na leitura do arquivo temporario");
              }
              if(resultado){
                result = util.removerAcentos(resultado.toString());
                res.send(result.toLowerCase());
                res.end();
              } else {
                res.send("erro");
                res.end();
              }
              // Apaga arquivos
              fs.unlink(arquivoTemp, function(err){
                console.log(err);
              });
              fs.unlink(arquivo, function(err){
                console.log(err);
              });
            });       
          });

          
 
    }
  });
};
