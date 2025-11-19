const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Banco via Variáveis de Ambiente
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'mydatabase',
  password: process.env.DB_PASS || 'password',
  port: 5432,
});

// Cria a tabela automaticamente ao iniciar
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
`).catch(err => console.error('Erro ao criar tabela:', err));

// Rota 1: Listar (GET)
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Rota 2: Cadastrar (POST)
app.post('/users', async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query('INSERT INTO users (name) VALUES ($1)', [name]);
    res.status(201).send('Usuário criado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Backend rodando na porta interna 3000');
});