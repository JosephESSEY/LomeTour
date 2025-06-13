// src/models/siteModel.js
const pool = require('../config/db');

exports.createSite = async (data) => {
  const {
    nom,
    description,
    latitude,
    longitude,
    adresse,
    imageurl,
    dateajout,
    idcategorie
  } = data;

  const result = await pool.query(
    `INSERT INTO sitetouristique
      (nom, description, latitude, longitude, adresse, imageurl, dateajout, idcategorie)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [nom, description, latitude, longitude, adresse, imageurl, dateajout, idcategorie]
  );
  return result.rows[0];
};

exports.getAllSites = async () => {
  const result = await pool.query(`
    SELECT s.*, c.nom
    FROM sitetouristique s
    JOIN categories c ON s.idcategorie = c.idcategorie
    ORDER BY s.idsite DESC
  `);
  return result.rows;
};

exports.getSiteById = async (idsite) => {
  const result = await pool.query(
    `SELECT * FROM sitetouristique WHERE idsite = $1`,
    [idsite]
  );
  return result.rows[0];
};

exports.updateSite = async (idsite, data) => {
  const {
    nom,
    description,
    latitude,
    longitude,
    adresse,
    imageurl,
    dateajout,
    idcategorie
  } = data;

  const result = await pool.query(
    `UPDATE sitetouristique
     SET nom = $1, description = $2, latitude = $3, longitude = $4,
         adresse = $5, imageurl = $6, dateajout = $7, idcategorie = $8
     WHERE idsite = $9
     RETURNING *`,
    [nom, description, latitude, longitude, adresse, imageurl, dateajout, idcategorie, idsite]
  );
  return result.rows[0];
};

exports.deleteSite = async (idsite) => {
  await pool.query(`DELETE FROM sitetouristique WHERE idsite = $1`, [idsite]);
};
