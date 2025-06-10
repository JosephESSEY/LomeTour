// src/models/imageModel.js
const pool = require('../config/db');

exports.addImage = async (url, idsite) => {
  const result = await pool.query(
    `INSERT INTO images (url, idsite) VALUES ($1, $2) RETURNING *`,
    [url, idsite]
  );
  return result.rows[0];
};

exports.getImagesBySite = async (idsite) => {
  const result = await pool.query(
    `SELECT * FROM images WHERE idsite = $1 ORDER BY idimage DESC`,
    [idsite]
  );
  return result.rows;
};

exports.deleteImage = async (idimage) => {
  await pool.query(`DELETE FROM images WHERE idimage = $1`, [idimage]);
};
