require('dotenv').config();
const express = require( 'express' );


const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


const carRouter = require('./routes/carRouter')
const authRouter = require('./routes/authRouter')
const servicesRouter = require('./routes/servicesRouter')
const rentalRouter = require('./routes/rentalRouter')

app.use('/cars', carRouter)
app.use('/auth', authRouter)
app.use('/services', servicesRouter)
app.use('/rental', rentalRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
})


function LoggerMiddleware(req, res, next){
    console.log(`Request api received at: ${new Date()}`)
    next();
}

app.use(LoggerMiddleware);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app listing on port ${port}`);
})