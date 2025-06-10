const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Accès refusé' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user.id, user.role
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;
