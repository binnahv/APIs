const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Carregar variáveis de ambiente
dotenv.config();

// Criar o app Express
const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para JSON
app.use(express.json());

// Rota inicial para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('API está rodando!');
});

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
