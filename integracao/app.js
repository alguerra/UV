var request = require("request");
var fs = require("fs");
var db = require("./db.js");

const URL_BASE = "https://chronos-stage.urbanovitalino.com.br/api/watson/resources/";
const API_TOKEN = "EB0E2143CB0066D41ABE0DDB78F80A66BD96E154695FA8D08E9F27688A7CDD4330FB0CA312C85DAA8B422E3AA2AB4A4254B0465B48D625CFAF16FD2659CAF5E1";

let entidades = [
	"areas",
	"esferas",
	"instancias-processos",
	"equipes",
	"tipos-acoes",
	"fases-processos",
	"advogados-adversos",
	"clientes",
	"clientes-adversos",
	"cidades",
	"varas",
	"orgaos",
	"situacoes-processos"
];

entidades.forEach(function(entidade){

	let URL = URL_BASE + entidade + "/" + "?api_token=" + API_TOKEN + "&limit=1000" ;
	let tabela = entidade.replace("-","");


	request(URL, function (error, response, body) {
		if(response.statusCode == 200) {
			dados = JSON.parse(response.body);
			totalPaginas = dados.meta.pagination.total_pages;
			console.log(totalPaginas);
			//console.log(dados.meta);
							
			for(i=1; i <= totalPaginas ; i++) {
				URL_INT = URL + "&page=" + i ;

											
				request(URL_INT, function (erro, resposta, corpo) {
					if(resposta && resposta.statusCode == 200){
						data = JSON.parse(resposta.body);
						data.data.forEach(function(el){
							linha = entidade + "," + el.id + "," + el.presentation + "\n";
							fs.appendFile("arquivos/" + entidade + ".csv", linha, function(erro){
								if(erro) console.log(erro);
							});
							db(tabela, el.id, el.presentation);
						})
					}
				});
				
			}
		}
	});

})