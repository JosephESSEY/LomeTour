const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = await createUser({ nom, email, mot_de_passe: hashedPassword });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur inscription', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide.' });

    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!valid) return res.status(400).json({ message: 'Email ou mot de passe invalide.' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, utilisateur: { id: user.id, nom: user.nom, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur connexion', error: err.message });
  }
};

module.exports = { register, login };
