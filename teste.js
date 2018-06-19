function retira_acentos(str) {
	com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
	sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
	novastr="";
	for(i=0; i<str.length; i++) {
		troca=false;
		for (a=0; a<com_acento.length; a++) {
			if (str.substr(i,1)==com_acento.substr(a,1)) {
				novastr+=sem_acento.substr(a,1);
				troca=true;
				break;
			}
		}
		if (troca==false) {
			novastr+=str.substr(i,1);
		}
	}
	return novastr;
}		

var palavras="Último coração alumínio latência opções blablabla...";
console.log(retira_acentos(palavras));