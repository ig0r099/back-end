const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({origin: "*"}));

const funcionarios = require('./routes/funcionario');
app.use('/routes/funcionarios', funcionarios);

const dependentes = require('./routes/dependente');
app.use('/routes/dependentes', dependentes);

const times = require('./routes/time');
app.use('/routes/times', times);

const jogador = require('./routes/jogador');
app.use('/routes/jogadores', jogador);

module.exports = app;
