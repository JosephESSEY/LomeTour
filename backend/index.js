const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

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


app.use('/uploads', express.static('public/uploads'));



app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur le port : ${process.env.PORT}`);
});