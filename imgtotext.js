var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require("fs");
const { exec } = require('child_process');
var util = require("./util.js");
var request = require("request");


module.exports = function(app) {
	app.post("/imgtotext", upload.single('arquivo'), function(req,res){
       
     if(req.file.path) {  		      
          
          var dirTemp = "conv_" + Math.floor((Math.random() * 100000) + 1).toString();
          //console.log(dirTemp);
          
          arquivoTemp = req.file.path; 
          arquivo = req.file.path;
          fs.mkdirSync(__dirname + "/uploads/" + dirTemp);
          //util.criarDiretorio(dirtemp);

          var resultado = '';

          // Gera imagens no diretorio temporario
          exec(__dirname + '/pdftoimg.sh ' + __dirname + '/' + arquivo + ' ' + __dirname  +  '/uploads/' + dirTemp, (err, stdout, stderr) => {
            if (err) {
              console.log(err)
              return;
            } 

            //Lê arquivos e submete a conversao do Google Cloud
            qtd = 0;
            fs.readdir(__dirname + '/uploads/' + dirTemp, function(err, files){
              if(err){
                console.log("Erro na leitura dos arquivos");
                return;
              }
              files.forEach(function(file){
                arquivo = fs.readFileSync(__dirname + '/uploads/' + dirTemp + "/" + file, 'base64');
                request.post({
                  url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBM_bGIeX-JihvBbFy2hYWrnAEJgVVSm0E",
                  headers: {
                     "Content-Type": "application/json"
                  },
                  body: {
                    "requests": [
                      {
                        "image": {
                          "content": arquivo 
                        },
                        "features": [
                          {
                            "type": "DOCUMENT_TEXT_DETECTION"
                          }
                        ]
                      }
                    ]
                  },
                  json:true
             }, function(error, response, body){
                qtd = qtd + 1;
                if(error) console.log(error);
                  if(response.body.responses[0].textAnnotations[0].description){
                    resultado = resultado + JSON.stringify(response.body.responses[0].textAnnotations[0].description);
                  }
                if(qtd >= files.length){
                  //console.log(resultado);
                  res.send(resultado);
                  res.end();
                  console.log(resultado);
                  util.apagarDiretorio(dirTemp);
                  fs.unlink(__dirname + '/' + arquivoTemp, function(err){
                    if(err){
                    console.log("Nao foi possivel apagar o arquivo temporario");
                    console.log(err);
                    }
                  })
                  return;
                }
                

                
                        
                
             });
             //console.log(resultado);
             //res.send(resultado);
              })

              

            })
            
                   
          });

    //     
    
    }
    
  });
};
