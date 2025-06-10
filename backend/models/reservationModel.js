const pool = require('../config/db');

exports.create = async ({ datevisite, heure, nombrepersonnes, status, idsite, iduser }) => {
  const query = `
    INSERT INTO reservation (datevisite, heure, nombrepersonnes, status, idsite, iduser, datereservation)
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
    RETURNING *`;
  const values = [datevisite, heure, nombrepersonnes, status, idsite, iduser];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getAll = async () => {
  const query = `
    SELECT r.*, u.nom AS visiteur, s.nom AS site
    FROM reservation r
    JOIN users u ON r.iduser = u.iduser
    JOIN sitetouristique s ON r.idsite = s.idsite
    ORDER BY r.datereservation DESC`;
  const result = await pool.query(query);
  return result.rows;
};

exports.getByUser = async (iduser) => {
  const query = `
    SELECT r.*, s.nom AS site
    FROM reservation r
    JOIN sitetouristique s ON r.idsite = s.idsite
    WHERE r.iduser = $1
    ORDER BY r.datereservation DESC`;
  const result = await pool.query(query, [iduser]);
  return result.rows;
};

exports.updateStatus = async (idreservation, status) => {
  const result = await pool.query(
    `UPDATE reservation SET status = $1 WHERE idreservation = $2 RETURNING *`,
    [status, idreservation]
  );
  return result.rows[0];
};

exports.delete = async (idreservation) => {
  await pool.query(`DELETE FROM reservation WHERE idreservation = $1`, [idreservation]);
};
