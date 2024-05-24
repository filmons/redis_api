const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');
const config = require('./config/config');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', dataRoutes);

// Start the server
app.listen(config.server.port, () => {
  console.log(`Server running at http://localhost:${config.server.port}/`);
});
