const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const PORT = 3000;

app.get('/api/produtos', (_req, res) => {
  const produtos = lerProdutos();
  res.json(produtos);
});

function lerProdutos() {
  const dados = fs.readFileSync(path.join(__dirname, 'publico', 'dados.json'));
  return JSON.parse(dados);
}

app.use((req, res) => {
  let filePath = path.join(__dirname, 'publico', req.path);

  if (req.path === '/') {
    filePath = path.join(__dirname, 'publico', 'index.html');
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('<h1>404 - Página não encontrada</h1>');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});