var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

// food routes
router.get('/food', ctrlFood.foodList);
router.post('/food', ctrlFood.foodCreate);
router.get('/food/:foodid', ctrlFood.foodReadOne);
router.put('/food/:foodid', ctrlFood.foodUpdateOne);
router.delete('/food/:foodid', ctrlFood.foodDeleteOne);

module.exports = router;