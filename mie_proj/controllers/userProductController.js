var UserProduct = require('../model/userProduct');

//Create endpoint /api/userProduct for POSTS
exports.addUserProduct =  function(req, res) {
  // Create a new instance of the User Product
  var product = new UserProduct(); 
  //Set the UserProduct properties that came from the POST data
 // product._Model_id = req.body.model_id;
  product.verified  = false;  
  product.product_serial_no = req.body.product_serial_no;
  product.product_nick_name = req.body.product_nick_name;
  product.purchase_DT = req.body.mPurchaseDate;
  product.dealer = req.body.mDealerInfo;
  product.is_deleted = false;
  product.purchase_cost = req.body.mProductPrice;
  product._cust_id = req.body.user_id;
  product.mobieLocalLocation= req.body.mLocalLocation;;						   
  product.mobileUserRegContactNumber = req.body.mUserRegContactNumber;
  product.mobileWarrantyEndsDate = req.body.mWarrantyEndsDate;
  product.mobileWarrantyStatus = req.body.mWarrantyStatus;
  product.mobileWarrantyType = req.body.mWarrantyType;
  product._model_id = req.body.mModelNo;
  
  // Save the user and check for error
  product.save(function(err) {
    if (err)
    	  res.json({status:'901',message:'Expetion occurred while adding user product' 
        	  ,data:{},error:err});
    else
    	  res.json({status:'900',message:'User Product added successfully' 
        	  ,data:product});
  });
};

//Create endpoint /api/userProduct/:userProductId for PUT
exports.updateUserProduct =  function(req, res) {
	  // Use the UserProduct model to find a specific user Product
		UserProduct.findById(req.params.userProductId, function(err, product) {
	    if (err)
	    	res.json({status:'901',message:'Expetion occurred while updating user product' 
	        	  ,data:{},error:err});
	    else {
	    	product.verified  = false;  
		    product.product_serial_no = req.body.mSerialNo;
		    product.product_nick_name = req.body.mNickName;
		    product.purchase_DT = req.body.mPurchaseDate;
		    product.dealer = req.body.mDealerInfo;
		    product.is_deleted = false;
		    product.purchase_cost = req.body.mProductPrice;
		    product._cust_id = req.body.user_id;
		    product.mobieLocalLocation= req.body.mLocalLocation;;						   
		    product.mobileUserRegContactNumber = req.body.mUserRegContactNumber;
		    product.mobileWarrantyEndsDate = req.body.mWarrantyEndsDate;
		    product.mobileWarrantyStatus = req.body.mWarrantyStatus;
		    product.mobileWarrantyType = req.body.mWarrantyType;
		    product._model_id = req.body.mModelNo;	    

		    // Save the userProduct and check for errors
		    product.save(function(err) {
		      if (err)
		    	  res.json({status:'901',message:'Expetion occurred while updating user product' 
		        	  ,data:{},error:err});
		      else 
		    	  res.json({status:'900',message:'User Product updated successfully' 
		        	  ,data:product});
		    });

	    }
	    	  });
};

//Create endpoint /api/userProduct/ for GET
exports.getUserProducts = function(req, res) {
  // Use the Beer model to find all beer
	UserProduct.find(function(err, products) {
    if (err)
    	res.json({status:'901',message:'Expetion occurred while fetching all user product' 
      	  ,data:{},error:err});
    else
    	res.json({status:'900',message:'All product fetched successfully' 
      	  ,data:products});
  });
	
};

//Create endpoint /api/userProduct/:userProductId for GET
exports.getUserProduct  = function(req, res) { 
	UserProduct.findById(req.params.userProductId, function(err, product) {
    if (err)
      	res.json({status:'901',message:'Expetion occurred while fetching user product' 
        	  ,data:{},error:err});
    else
    	res.json({status:'900',message:'User product fetched successfully' 
        	  ,data:product});
  });
};
