// src/models/categorieModel.js
const pool = require('../config/db');

// 🔹 Créer
exports.createCategorie = async ({ nom }) => {
  const result = await pool.query(
    'INSERT INTO categories (nom) VALUES ($1) RETURNING *',
    [nom]
  );
  return result.rows[0];
};

// 🔹 Obtenir tout
exports.getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories ORDER BY idcategorie ASC');
  return result.rows;
};

// 🔹 Obtenir par ID
exports.getCategorieById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE idcategorie = $1', [id]);
  return result.rows[0];
};

// 🔹 Mettre à jour
exports.updateCategorie = async (id, { nom, description }) => {
  const result = await pool.query(
    'UPDATE categories SET nom = $1 WHERE id = $2 RETURNING *',
    [nom, id]
  );
  return result.rows[0];
};

// 🔹 Supprimer
exports.deleteCategorie = async (id) => {
  await pool.query('DELETE FROM categories WHERE idcategorie = $1', [id]);
};
