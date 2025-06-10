// src/controllers/siteController.js
const Site = require('../models/siteModel');

exports.create = async (req, res) => {
  try {
    const site = await Site.createSite(req.body);
    res.status(201).json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sites = await Site.getAllSites();
    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const site = await Site.getSiteById(req.params.id);
    if (!site) return res.status(404).json({ message: "Site introuvable" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const site = await Site.updateSite(req.params.id, req.body);
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Site.deleteSite(req.params.id);
    res.json({ message: "Site supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
