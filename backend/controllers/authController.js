const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ nom, email, password: hashedPassword });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur inscription', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Email Non trouvé.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Mot de passe invalide.' });

    const token = jwt.sign(
      { id: user.idUser, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, utilisateur: { id: user.idUser, nom: user.nom, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur connexion', error: err.message });
  }
};

module.exports = { register, login };
