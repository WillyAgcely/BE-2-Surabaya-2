const prisma = require('../config/prisma')

async function searchCars(req, res) {
    try {
        const {location, pickupDate, returnDate} = req.query;

        const searchResults = await prisma.car.findMany({
            where: {
                location,
                pickupDate,
                returnDate
            },
        });

        res.json({searchResults, message: 'Search result based on location and dates'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: 'A server problem occurred'});
    }
}

module.exports = {searchCars}