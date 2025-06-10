const pool = require('../config/db');

const createUser = async ({ nom, email, mot_de_passe, role = 'utilisateur' }) => {
  const query = `
    INSERT INTO "User" (nom, email, mot_de_passe, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nom, email, role;
  `;
  const values = [nom, email, mot_de_passe, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM "User" WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
