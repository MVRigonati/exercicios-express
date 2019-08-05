const express = require('express'); // import
const saudacao = require('./saudacaoMid');
const app = express(); // construtor da aplicacao

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