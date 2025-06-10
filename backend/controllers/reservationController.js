const Reservation = require('../models/reservationModel');

exports.create = async (req, res) => {
  try {
    const { datevisite, heure, nombrepersonnes, status, idsite, iduser } = req.body;
    const reservation = await Reservation.create({ datevisite, heure, nombrepersonnes, status, idsite, iduser });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const reservations = await Reservation.getAll();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const iduser = req.params.iduser;
    const reservations = await Reservation.getByUser(iduser);
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Reservation.updateStatus(req.params.idreservation, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Reservation.delete(req.params.idreservation);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
