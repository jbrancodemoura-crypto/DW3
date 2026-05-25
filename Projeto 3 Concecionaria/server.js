const express = require("express");
const path = require("path");

const app = express();

const ofertas = require("./ofertas.json");
const novos = require("./novos.json");
const seminovos = require("./seminovos.json");

const PORT = 6200;

// Pasta pública
app.use(express.static("public"));

// Página principal
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Quem sou
app.get("/quemsou", (req, res) => {

    res.sendFile(path.join(__dirname, "views", "quemsou.html"));
});

// Ofertas
app.get("/ofertas", (req, res) => {

    let html = "<h1>Ofertas</h1>";

    ofertas.forEach(carro => {

        html += `
            <hr>

            <h2>${carro.modelo}</h2>

            <p>Preço: ${carro.preco}</p>
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Novos
app.get("/novos", (req, res) => {

    let html = "<h1>Veículos Novos</h1>";

    novos.forEach(carro => {

        html += `
            <hr>

            <h2>${carro.modelo}</h2>

            <p>${carro.descricao}</p>

            <img src="${carro.foto}" width="300" alt="${carro.modelo}">
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Seminovos
app.get("/seminovos", (req, res) => {

    let html = "<h1>Veículos Seminovos</h1>";

    seminovos.forEach(carro => {

        html += `
            <hr>

            <h2>${carro.modelo}</h2>

            <p><strong>Ponto positivo:</strong> ${carro.positivo}</p>

            <p><strong>Ponto negativo:</strong> ${carro.negativo}</p>
        `;
    });

    html += `<br><a href="/">Retornar</a>`;

    res.send(html);
});

// Servidor
app.listen(PORT, () => {

    console.log("Servidor rodando na porta 6200");
});