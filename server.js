const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meu_banco",
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
});

// Rota para buscar todos os usuários
app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para adicionar um usuário
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;
    db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email], (err, result) => {
        if (err) throw err;
        res.json({ message: "Usuário cadastrado!" });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
