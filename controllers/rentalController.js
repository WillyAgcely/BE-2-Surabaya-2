// controllers/rentalController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createRental(req, res) {
  try {
    const { name, location, pickupDate, returnDate } = req.body;

    const rental = await prisma.rental.create({
      data: {
        name,
        location,
        pickupDate: new Date(pickupDate),
        returnDate: new Date(returnDate),
      },
    });

    res.json({
      message: 'Rental created successfully',
      data: rental,
    });
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllRentals(req, res) {
  try {
    const rentals = await prisma.rental.findMany();
    res.json({
      message: 'Get list of all rentals successfully',
      data: rentals,
    });
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createRental,
  getAllRentals,
};
