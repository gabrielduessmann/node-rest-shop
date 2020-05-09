// run express
const express = require('express');
const app = express();

// run morgan
const morgan = require('morgan');
app.use(morgan('dev'));

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