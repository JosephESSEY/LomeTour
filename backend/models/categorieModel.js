// src/models/categorieModel.js
const pool = require('../config/db');

// 🔹 Créer
exports.createCategorie = async ({ nom, description }) => {
  const result = await pool.query(
    'INSERT INTO categories (nom, description) VALUES ($1, $2) RETURNING *',
    [nom, description]
  );
  return result.rows[0];
};

// 🔹 Obtenir tout
exports.getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
  return result.rows;
};

// 🔹 Obtenir par ID
exports.getCategorieById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

// 🔹 Mettre à jour
exports.updateCategorie = async (id, { nom, description }) => {
  const result = await pool.query(
    'UPDATE categories SET nom = $1, description = $2 WHERE id = $3 RETURNING *',
    [nom, description, id]
  );
  return result.rows[0];
};

// 🔹 Supprimer
exports.deleteCategorie = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};
