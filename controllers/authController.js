const prisma = require('../config/prisma');
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'A server error occurred' });
    }
};

// Login endpoint
const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username,
            },
        });
        
        console.log('Received Password:', password);
        console.log('User password from Database:', user.password);


        if (!user) {
            return res.status(401).json({message: 'Login Failed'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.json({message: 'Login Successfully'});
        } else {
            res.status(401).json({message: 'Login Failed'});
        }
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({message: 'A server error occured'});
    }
}

module.exports = {register, login};
