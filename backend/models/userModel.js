const pool = require('../config/db');

const createUser = async ({ nom, email, password, role = 'utilisateur' }) => {
  const query = `
    INSERT INTO users (nom, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING idUser, nom, email, role;
  `;
  const values = [nom, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
