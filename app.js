const express = require('express');

// run express
const app = express();

// product
const producstRoutes = require('./api/routes/products');
app.use('/products', producstRoutes);

// orders
const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);

module.exports = app;