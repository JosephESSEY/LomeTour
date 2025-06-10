const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const authRoutes = require('./routes/authRoutes');

app.use('/api/users', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur le port : ${process.env.PORT}`);
});