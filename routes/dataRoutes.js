const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Routes
router.get('/', dataController.getData);
router.get('/:id', dataController.getDataById);
router.post('/add', dataController.addData);
router.put('/update', dataController.updateData);

module.exports = router;
