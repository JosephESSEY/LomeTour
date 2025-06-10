// src/controllers/categorieController.js
const model = require('../models/categorieModel');

// 🔹 POST /api/categories
exports.create = async (req, res) => {
  try {
    const categorie = await model.createCategorie(req.body);
    res.status(201).json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET /api/categories
exports.findAll = async (req, res) => {
  try {
    const categories = await model.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 GET /api/categories/:id
exports.findById = async (req, res) => {
  try {
    const categorie = await model.getCategorieById(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 PUT /api/categories/:id
exports.update = async (req, res) => {
  try {
    const categorie = await model.updateCategorie(req.params.id, req.body);
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DELETE /api/categories/:id
exports.remove = async (req, res) => {
  try {
    await model.deleteCategorie(req.params.id);
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
