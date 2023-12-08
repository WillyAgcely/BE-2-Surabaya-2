const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/servicesController');

router.get('/services', servicesController.getAllServices);
router.post('/product', servicesController.createService);

module.exports = router;
