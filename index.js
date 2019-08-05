const express = require('express'); // import
const app = express(); // construtor da aplicacao

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
*/
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

app.listen(3000, () => {
	console.log('backend executando');
});