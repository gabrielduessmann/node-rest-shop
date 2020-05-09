const http = require('http');
const app = require('./app.js');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// start the server 
server.listen(port)