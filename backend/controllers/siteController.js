// src/controllers/siteController.js
const Site = require('../models/siteModel');
const fs = require('fs');
const path = require('path');

exports.create = async (req, res) => {
  try {
    const { nom, description, latitude, longitude, adresse, dateajout, idcategorie } = req.body;
    const imageurl = req.file ? `/uploads/${req.file.filename}` : null;

    const site = await Site.createSite({
      nom,
      description,
      latitude,
      longitude,
      adresse,
      imageurl,
      dateajout,
      idcategorie
    });

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
    const oldSite = await Site.getSiteById(req.params.id);
    if (!oldSite) return res.status(404).json({ message: "Site introuvable" });

    // Supprimer l'ancienne image si une nouvelle est uploadée
    if (req.file && oldSite.imageurl) {
      const oldImagePath = path.join(__dirname, '..', oldSite.imageurl);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    }

    const imageurl = req.file ? `/uploads/${req.file.filename}` : oldSite.imageurl;

    const updatedData = {
      nom: req.body.nom,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      adresse: req.body.adresse,
      imageurl,
      dateajout: req.body.dateajout,
      idcategorie: req.body.idcategorie
    };

    const updatedSite = await Site.updateSite(req.params.id, updatedData);
    res.json(updatedSite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const site = await Site.getSiteById(req.params.id);
    if (!site) return res.status(404).json({ message: "Site introuvable" });

    // Supprimer l'image liée
    if (site.imageurl) {
      const imagePath = path.join(__dirname, '..', site.imageurl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Site.deleteSite(req.params.id);
    res.json({ message: "Site supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
