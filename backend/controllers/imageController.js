// src/controllers/imageController.js

const Image = require('../models/imageModel');

exports.add = async (req, res) => {
  try {
    const idsite = req.body.idsite;
    const filePath = `/uploads/${req.file.filename}`;

    const image = await Image.addImage(filePath, idsite);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySite = async (req, res) => {
  try {
    const idsite = req.params.idsite;
    const images = await Image.getBySite(idsite);
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const idimage = req.params.idimage;
    await Image.deleteImage(idimage);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
