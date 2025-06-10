const Commentaire = require('../models/commentaireModel');

exports.create = async (req, res) => {
  try {
    const { contenu, iduser, idsite } = req.body;
    const newComment = await Commentaire.create(contenu, iduser, idsite);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySite = async (req, res) => {
  try {
    const idsite = req.params.idsite;
    const comments = await Commentaire.getBySite(idsite);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.idcommentaire;
    await Commentaire.delete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
