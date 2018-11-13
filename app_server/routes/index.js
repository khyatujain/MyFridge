var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlItemList = require('../controllers/displaylist');
var ctrlAddEdit = require('../controllers/createedit');


/* GET home page. */
router.get('/',ctrlMain.index );
router.get('/displaylist', ctrlItemList.foodList);
router.get('/createedit', ctrlAddEdit.foodCreate);
router.post('/createedit', ctrlAddEdit.doFoodCreate);

module.exports = router;
