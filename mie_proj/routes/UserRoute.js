var express  = require('express');
var router   = express.Router();
var userController = require('../controllers/user');

//Create endpoint handlers for /user
router.route('/user')
  .post(userController.postUser)
  .get(userController.getUsers);

router.route('/checkUser')
.get(userController.checkUser);

//Create endpoint handlers for /user/:user_id
router.route('/user/:user_id')
  .get(userController.getUser)
  .put(userController.putUser);

router.route('/userSearch/:mobile')
.get(userController.getUserByMobile);



module.exports = router;