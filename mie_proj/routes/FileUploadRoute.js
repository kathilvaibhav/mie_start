var express  = require('express');
var router   = express.Router();
var fileController = require('../controllers/fileController');

//Create endpoint handlers for /user
router.route('/images/userProduct/:customerId')
  .post(fileController.uploadUserProductImage);

module.exports = router;