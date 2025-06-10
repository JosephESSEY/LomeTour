const pool = require('../config/db');

exports.create = async (contenu, iduser, idsite) => {
  const query = `
    INSERT INTO commentaire (contenu, iduser, idsite)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [contenu, iduser, idsite];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getBySite = async (idsite) => {
  const query = `
    SELECT c.*, u.nom, u.email
    FROM commentaire c
    JOIN users u ON c.iduser = u.iduser
    WHERE c.idsite = $1
    ORDER BY c.datecommentaire DESC`;
  const result = await pool.query(query, [idsite]);
  return result.rows;
};

exports.delete = async (idcommentaire) => {
  await pool.query('DELETE FROM commentaire WHERE idcommentaire = $1', [idcommentaire]);
};
