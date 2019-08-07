function salvar(req, res) {
    res.send('Usuario > Salvar');
}

function obter(req, res) {
    res.send('Usuario > Obter');
}

// Um objeto com as funcoes
module.exports = { salvar, obter };