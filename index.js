const express = require('express'); // import
const saudacao = require('./saudacaoMid');
const bodyParser = require('body-parser'); // Para requisicoes POST
const app = express(); // construtor da aplicacao

// Importando modulos de outro arquivo
const usuarioApi = require('./api/usuario');
app.post('/usuario', usuarioApi.salvar);
app.get('/usuario', usuarioApi.obter);

// Importando com parametros
require('./api/produto')(app, 'com param!');
//const produtoApi = require('./api/produto'); produtoApi(app, 'com param!');

/*
	"bodyParser" ira adicionar um objecto chamado "body"
	com as informacoes que forem enviadas atraves do
	body da requisicao.
	Caso seja JSON, a primeira callback ira transformar
	a informacao para um objeto JSON, caso seja
	texto a segunda requisicao ira realizar esse parse.
*/
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Utilizando URL encoded (para forms)
app.use(saudacao('Marcus'));

/*
	"use" ou "all" irao responder a qualquer metodo HTTP.
	Nenhum caminho foi especificado, entao
	todas as requisicoes de todos os caminhos
	irao passar por aqui.

app.use((req, res) => {
	res.send('Estou <b>bem</b>!');
});
*/

/*
	Apenas o caminho '/opa' ira passar por aqui

app.use('/opa', (req, res) => {
	res.send('Estou muito <b>bem</b>!');
});
*/

/*
	Apenas metodos GET do HTTP sera atendido aqui

app.get('/opa', (req, res) => {
	res.send('Estou muito <b>bem</b>!');
});
*/

/*
	O formato de resposta anterior foi HTML
	porem tambem pode ser utilizado um JSON.
	
app.get('/', (req, res) => {
	res.json({
		data: [
			{ id: 7, name: 'Ana', position: 1 },
			{ id: 34, name: 'Bia', position: 2 },
			{ id: 73, name: 'Carlos', position: 3 },
		],
		count: 30,
		skip: 0,
		limit: 3,
		status: 200
	})
});
*/

// Recebendo informacoes pelos parametros
// (Ex.: localhost:3000/clientes/relatorio?completo=false&ano=2018)
app.get('/clientes/relatorio', (req, res) => {
	res.send(`Cliente relatorio: completo = ${req.query.completo}; ano = ${req.query.ano}`);
});

// Recebendo dados da URL
// (Ex.: localhost:3000/clientes/103)
app.get('/clientes/:id', (req, res) => {
	res.send(`ID ${req.params.id} selecionado!`);
});

/*
	Recebendo parametros de POST (sem body parser) atraves
	do corpo da requisicao
app.post('/corpo', (req, res) => {
	
	let corpo = '';
	req.on('data', function(parte) {
		// A informacao pode chegar em varios pacotes (stream de dados),
		// enquanto houver informacoes chegando, essa funcao sera executada.
		corpo += parte;
	});
	req.on('end', function() {
		// Quando as informacoes acabarem,
		// essa fucnao sera executada.
		res.send(corpo);
	});

});
*/

/*
	Recebendo parametros de POST (com body parser) atraves
	do corpo da requisicao
*/
app.post('/corpo', (req, res) => {
	res.send(JSON.stringify(req.body));
});

/*
	Middleware e um metodo que faz alguma coisa
	antes das outras funcoes, e depois inicia o
	fluxo de execucao normal.
	Parar isso e utilzada a funcao "next", recebida
	por parametro. caso exista mais de uma funcao
	para o mesmo contexto, o "next" ira chamar a
	proxima, respeitando a ordem em que elas foram
	escritas no codigo.
*/
app.use('/', (req, res, next) => {
	console.log('Antes');
	next();
});
app.use('/', (req, res, next) => {
	console.log('Depois');
	res.send('1');
	next();
});

app.listen(3000, () => {
	console.log('backend executando');
});