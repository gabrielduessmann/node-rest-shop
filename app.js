// express
const express = require('express');
const app = express();

// mongoose
const mongoose = require('mongoose');
// conect to mongo database
mongoose.connect
('mongodb+srv://user435:'+process.env.MONGO_ATLAS_PW
+'@node-rest-shop-revdc.mongodb.net/test?retryWrites=true&w=majority',
{
    useUnifiedTopology: true,
    useNewUrlParser: true
}
);
mongoose.Promise = global.Promise;


// morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// product 
const producstRoutes = require('./api/routes/products');
app.use('/products', producstRoutes);

// orders
const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);

//handle error
app.use((req, res, next) => {
    const error = new Error('Request not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;