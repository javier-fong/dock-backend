const express = require('express');
const router = express.Router();

const GroceryController = require('../controllers/groceries-controller');

router.post('/grocery', GroceryController.createGrocery);
router.get('/groceries', GroceryController.getGroceries);

module.exports = router;