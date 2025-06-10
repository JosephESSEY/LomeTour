const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentaireController');

router.post('/', controller.create);
router.get('/:idsite', controller.getBySite);
router.delete('/:idcommentaire', controller.delete);

module.exports = router;
