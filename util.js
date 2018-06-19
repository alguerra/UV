var fs = require("fs");

module.exports = {

	criarDiretorio: function(dir){
		var dir = "./uploads/" + dir;

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}	
	},

	apagarDiretorio: function(dir){
		dir = __dirname + '/uploads/' + dir;
		if(fs.existsSync(dir)){
			arquivos = fs.readdir(dir, function(err, files){
				if(err){
					console.log(err);
					return;
				}
				for(var i=0; i< files.length; i++){
					fs.unlink(dir + "/" + files[i], function(err){
						if(err) console.log(err);
					});
				};
				fs.rmdir(dir, function(err){
					if(err) console.log(err);
				})
			});
		} else {
			console.log("nao existe");
		}
	},

	removerAcentos: function(str) {
		com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
		sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
		novastr="";
		for(i=0; i < str.length; i++) {
			troca=false;
			for (a=0; a < com_acento.length; a++) {
				if (str.substr(i,1) == com_acento.substr(a,1)) {
					novastr += sem_acento.substr(a,1);
					troca = true;
					break;
				}
			}
			if (troca==false) {
				novastr += str.substr(i,1);
			}
		}
		return novastr;
	}	

}

