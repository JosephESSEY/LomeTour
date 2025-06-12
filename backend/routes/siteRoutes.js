// src/routes/siteRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/siteController');
const upload = require('../middlewares/uploadMiddleware');


router.post('/', upload.single('image') ,controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
