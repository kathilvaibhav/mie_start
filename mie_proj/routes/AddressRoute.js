var express  = require('express');
var router   = express.Router();
var addressController = require('../controllers/addressController');

//Create endpoint handlers for /address
router.route('/address')
  .post(addressController.postAddress);
//.post(authController.isAuthenticated,addressController.postAddress);

//Create endpoint handlers for /address/:address_id
router.route('/address/:address_id')
  .get(addressController.getAddress)
  .put(addressController.putAddress);

router.route('/address_user/:user_id')
.get(addressController.getUserAllAddress);

module.exports = router;