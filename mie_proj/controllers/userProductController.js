var UserProduct = require('../model/userProduct');

//Create endpoint /api/userProduct for POSTS
exports.addUserProduct =  function(req, res) {
  // Create a new instance of the User Product
  var product = new UserProduct(); 
  //Set the UserProduct properties that came from the POST data
  product._Model_id = req.body.model_id;
  product.verified  = false;  
  product.product_serial_no = req.body.product_serial_no;
  product.product_nick_name = req.body.product_nick_name;
  product.purchase_DT = req.body.purchase_DT;
  product.dealer = req.body.dealer;
  product.is_deleted = false;
  product.Purchase_cost = req.body.Purchase_cost;
  
  // Save the user and check for error
  user.save(function(err) {
    if (err)
      res.json({message:'User Product Record not saved' + err ,data:product});
    else
    res.json({ message: 'User Product Record is added!', data: product });
  });
};

//Create endpoint /api/userProduct/:userProductId for PUT
exports.updateUserProduct =  function(req, res) {
	  // Use the UserProduct model to find a specific user Product
		UserProduct.findById(req.params.userProductId, function(err, product) {
	    if (err)
	      res.send(err);

	    //Set the UserProduct properties that came from the PUT data
	    product.verified  = req.body.verified;
	    product.product_serial_no = req.body.product_serial_no;
	    product.product_nick_name = req.body.product_nick_name;
	    product.purchase_DT = req.body.purchase_DT;
	    product.dealer = req.body.dealer;
	    product.is_deleted = req.body.is_deleted;
	    product.Purchase_cost = req.body.Purchase_cost;

	    // Save the userProduct and check for errors
	    product.save(function(err) {
	      if (err)
	        res.send(err);

	      res.json(user);
	    });
	  });
};

//Create endpoint /api/userProduct/ for GET
exports.getUserProducts = function(req, res) {
  // Use the Beer model to find all beer
	UserProduct.find(function(err, products) {
    if (err)
      res.send(err);
    else
    res.json(products);
  });
	
};

//Create endpoint /api/userProduct/:userProductId for GET
exports.getUserProduct  = function(req, res) { 
	UserProduct.findById(req.params.userProductId, function(err, product) {
    if (err)
      res.send(err);

    res.json(product);
  });
};
