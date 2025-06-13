const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
require('dotenv').config();
const path = require("path");

const app = express();
app.use(express.json());
// app.use(helmet());


app.use(cors({
  origin: 'http://localhost:5173', // l'adresse de ton frontend React
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// Tes autres middlewares
app.use('/uploads', express.static('public/uploads'));


const authRoutes = require('./routes/authRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const siteRoutes = require('./routes/siteRoutes');
const imageRoutes = require('./routes/imageRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const reservationRoutes = require('./routes/reservationRoutes');


app.use('/api/users', authRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/reservations', reservationRoutes);






app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur le port : ${process.env.PORT}`);
});