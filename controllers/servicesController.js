const prisma = require('../config/prisma');

// Services endpoint get all products
async function getAllServices(req, res) {
    const { keyword, search } = req.query;
    try {
        const result = await prisma.services.findMany();
        res.json({
            message: 'Get list all data services is succesfully',
            data: result
    });
} catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({error: 'Internal Server Error'});
}
};


// endpoint post products by id
async function createService (req, res) {
    try {
        const {name, price, time} = req.body;
    
    const priceWithoutSymbols = price ? parseInt(price.replace(/[^\d]/g, '')): null;

    const extractedHours = parseInt(time);

    const result = await prisma.services.create({
        data:{
            name: name,
            price: priceWithoutSymbols,
            time: extractedHours
    }
    });

    res.json({
        message: 'Create data service is succesfully',
        data: result,
    });
} catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({error: 'Internal Server Error'});
}
};

module.exports ={
    getAllServices,
    createService
}