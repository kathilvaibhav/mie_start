var express  = require('express');
var router   = express.Router();
var userProductController = require('../controllers/userProductController');

//Create endpoint handlers for /user
router.route('/userProduct')
  .post(userProductController.addUserProduct)
  .get(userProductController.getUserProducts);


//Create endpoint handlers for /user/:user_id
router.route('/userProduct/:userProductId')
  .get(userProductController.getUserProduct)
  .put(userProductController.updateUserProduct);

router.route('/userProduct/:userProductId').delete(userProductController.deleteUserProduct);

module.exports = router;