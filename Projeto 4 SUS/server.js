const express = require("express");
const path = require("path");

const app = express();

const ofertas = require("./ofertas.json");
const novos = require("./novos.json");
const seminovos = require("./seminovos.json");

const PORT = 6200;

// Arquivos públicos
app.use(express.static("public"));

// Página inicial
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Quem sou
app.get("/quemsou", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "quemsou.html"));
});

// Ofertas
app.get("/ofertas", (req, res) => {

    let html = "<h1>Serviços e Programas Disponíveis</h1>";

    ofertas.forEach(servico => {

        html += `
            <hr>

            <h2>${servico.nome}</h2>

            <p><strong>Descrição:</strong> ${servico.descricao}</p>

            <p><strong>Vagas:</strong> ${servico.vagas}</p>
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Novos
app.get("/novos", (req, res) => {

    let html = "<h1>Novas Unidades e Equipamentos</h1>";

    novos.forEach(item => {

        html += `
            <hr>

            <h2>${item.nome}</h2>

            <p>${item.descricao}</p>

            <img src="${item.foto}" width="300" alt="${item.nome}">
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Seminovos
app.get("/seminovos", (req, res) => {

    let html = "<h1>Unidades de Saúde para Auditoria</h1>";

    seminovos.forEach(unidade => {

        html += `
            <hr>

            <h2>${unidade.nome}</h2>

            <p><strong>Ponto positivo:</strong> ${unidade.positivo}</p>

            <p><strong>Ponto negativo:</strong> ${unidade.negativo}</p>
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Servidor
app.listen(PORT, () => {

    console.log("Servidor rodando na porta 6200");
});