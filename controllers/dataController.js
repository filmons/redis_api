const mysqlConnection = require('../models/mysql_database');
const redisClient = require('../models/redis_server');

exports.getData = (req, res) => {
  redisClient.get('countries', (err, result) => {
    if (result) {
      res.json({ _source: 'Redis Server', data: JSON.parse(result) });
    } else {
      mysqlConnection.query('SELECT * FROM countries', (err, results) => {
        if (err) {
          res.status(500).send('Error fetching data from MySQL');
          return;
        }
        redisClient.setex('countries', 3600, JSON.stringify(results));
        res.json({ _source: 'MySQL Server', data: results });
      });
    }
  });
};

exports.getDataById = (req, res) => {
  const { id } = req.params;
  mysqlConnection.query(
    'SELECT * FROM countries WHERE country_id = ?',
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send('Error fetching data from MySQL');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Country not found');
        return;
      }
      res.json({ data: results[0] });
    }
  );
};

exports.addData = (req, res) => {
  const { country_id, country_name } = req.body;
  mysqlConnection.query(
    'INSERT INTO countries (country_id, country_name) VALUES (?, ?)',
    [country_id, country_name],
    (err, result) => {
      if (err) {
        res.status(500).send('Error adding data to MySQL');
        return;
      }
      redisClient.del('countries', (redisErr) => {
        if (redisErr) {
          res.status(500).send('Error clearing Redis cache');
          return;
        }
        res.status(200).send('Data added and cache cleared');
      });
    }
  );
};

exports.updateData = (req, res) => {
  const { country_id, country_name } = req.body;
  mysqlConnection.query(
    'UPDATE countries SET country_name = ? WHERE country_id = ?',
    [country_name, country_id],
    (err, result) => {
      if (err) {
        res.status(500).send('Error updating data in MySQL');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Country not found');
        return;
      }
      redisClient.del('countries', (redisErr) => {
        if (redisErr) {
          res.status(500).send('Error clearing Redis cache');
          return;
        }
        res.status(200).send('Data updated and cache cleared');
      });
    }
  );
};
