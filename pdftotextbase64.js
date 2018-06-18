
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require("fs");
const { exec } = require('child_process');



module.exports = function(app) {
	app.post("/pdftotextbase64",  function(req,res){
       
     if(req.body.arquivo) {  		      
          
            arquivoTemp = Math.floor((Math.random() * 100000) + 1).toString();
            arquivo = req.body.arquivo;

            let data = arquivo;  
            let buff = new Buffer(data, 'base64');  
            fs.writeFileSync("file01.pdf", buff);

            console.log('Base64 pdf data converted to file: file01.pdf' ); 


          // Salva em arquivo txt
          exec('pdftotext ' + 'file01.pdf ' + ' ' + arquivoTemp, (err, stdout, stderr) => {
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
                res.send(resultado.toString());
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
