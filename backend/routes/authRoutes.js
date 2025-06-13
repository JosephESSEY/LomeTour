const express = require('express');
const router = express.Router();
const pool = require('../config/db')
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/admin-auth', async (req, res) => {
  try {
    const user = await pool.query('SELECT role FROM users WHERE id = $1', [req.userId]);
    if (user.rows[0]?.role === 'admin') {
      return res.json({ check: true });
    } else {
      return res.json({ check: false });
    }
  } catch (err) {
    return res.status(500).json({ check: false });
  }
});


module.exports = router;
