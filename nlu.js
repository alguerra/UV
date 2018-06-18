var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var config = require("./config.js");
var util = require("./util.js");
var fs = require("fs");



module.exports = function(app){
	
	app.post("/nlu", function(req,res){
    username = config.nlu.username;
    password = config.nlu.password;
    model = config.nlu.model;
    version_date = '2017-02-27';
    
    
    if(req.body.texto){
      texto = req.body.texto;
                  
      var nlu = new NaturalLanguageUnderstandingV1({
      	username: username,
      	password: password,
        version_date: version_date,
      });

     	nlu.analyze({
     		"text": texto,
        "language": "pt",
        "features": {
          "entities": {
            "model": model,
            "emotion": true,
            "sentiment": true
          },
          "concepts": {},
          "categories": {}
        }
      },
         function(err, response) {
    		    if (err){ 
       	      console.log('error:', err);
              res.send(JSON.stringify(err));
       	      res.end();
     	      }else{ 
              console.log(JSON.stringify(response));
        	    res.send(JSON.stringify(response));
           		res.end();  
           	}   
         })
       
       
    } else {
      res.status(500);
      res.end();
    }
	})

};