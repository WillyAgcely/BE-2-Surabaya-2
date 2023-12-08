// routes/rentalRouter.js
const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.post('/rentals', rentalController.createRental);
router.get('/rentals', rentalController.getAllRentals);

module.exports = router;
