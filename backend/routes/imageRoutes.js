// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/imageController');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', upload.single('image'), controller.add);
router.get('/:idsite', controller.getBySite);
router.delete('/:idimage', controller.remove);

module.exports = router;
