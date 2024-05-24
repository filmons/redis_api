const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection(config.mysql);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
