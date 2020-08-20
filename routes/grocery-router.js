const express = require('express');
const router = express.Router();

const GroceryController = require('../controllers/groceries-controller');

router.post('/grocery', GroceryController.createGrocery);
router.get('/groceries', GroceryController.getGroceries);
router.put('/grocery/:id', GroceryController.updateGrocery);

module.exports = router;