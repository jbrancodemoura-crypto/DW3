const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

// Página principal
app.get("/", (req, res) => {

    res.send(`
        <h1>Calculadora IMC</h1>

        <form action="/calcular" method="POST">

            <input type="text" name="nome" placeholder="Nome" required>
            <br><br>

            <input type="number" step="0.01" name="peso" placeholder="Peso" required>
            <br><br>

            <input type="number" step="0.01" name="altura" placeholder="Altura" required>
            <br><br>

            <button type="submit">Calcular</button>

        </form>

        <br>

        <a href="/informacoes">Informações</a>
    `);
});

// Calcular IMC
app.post("/calcular", (req, res) => {

    const nome = req.body.nome;
    const peso = parseFloat(req.body.peso);
    const altura = parseFloat(req.body.altura);

    const imc = peso / (altura * altura);

    let classificacao = "";
    let mensagem = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do Peso";
    }
    else if (imc < 25) {
        classificacao = "Peso Normal";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    }
    else {
        classificacao = "Obesidade";
    }

    mensagem = "Continue cuidando da sua saúde!";

    res.send(`
        <h1>Resultado</h1>

        <p>Nome: ${nome}</p>
        <p>Peso: ${peso}</p>
        <p>Altura: ${altura}</p>
        <p>IMC: ${imc.toFixed(2)}</p>

        <h2>${classificacao}</h2>

        <p>${mensagem}</p>

        <a href="/">Retornar</a>
    `);
});

// Rotas
app.get("/abaixoPeso", (req, res) => {
    res.send(`
        <h1>Abaixo do Peso</h1>
        <a href="/">Retornar</a>
    `);
});

app.get("/pesoNormal", (req, res) => {
    res.send(`
        <h1>Peso Normal</h1>
        <a href="/">Retornar</a>
    `);
});

app.get("/sobrePeso", (req, res) => {
    res.send(`
        <h1>Sobrepeso</h1>
        <a href="/">Retornar</a>
    `);
});

app.get("/obesidade", (req, res) => {
    res.send(`
        <h1>Obesidade</h1>
        <a href="/">Retornar</a>
    `);
});

// Informações
app.get("/informacoes", (req, res) => {

    res.send(`
        <h1>Informações</h1>

        <p>
            O IMC é usado para medir o peso ideal.
        </p>

        <p>Fórmula:</p>

        <p>IMC = peso / altura²</p>

        <a href="/">Retornar</a>
    `);
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 5000");
});