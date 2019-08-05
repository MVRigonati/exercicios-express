// Construindo um midware
/*
	Um padrao utilizado e fazer uma funcao
	que sera executada no momento de
	registrar os componentes, e essa funcao
	retornara uma funcao midware que sera
	executada sempre que uma nova requisicao
	for recebida.
	Assim conseguimos ter uma maior
	flexibilidade nos parametros que podem
	ser passados para essa funcao.
*/
function saudacao(nome) {
	// Funcao para executar
	return function(req, res, next) {
		// Funcao de midware
		console.log(`Bem vindo ${nome}.`);
		next();
	}
}

module.exports = saudacao;