const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/user/:iduser', controller.getByUser);
router.put('/:idreservation', controller.updateStatus);
router.delete('/:idreservation', controller.delete);

module.exports = router;
