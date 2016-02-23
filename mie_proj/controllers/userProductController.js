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
  product.purchase_DT = req.body.purchase_DT;
  product.dealer = req.body.dealer;
  product.is_deleted = req.body.is_deleted;
  product.purchase_cost = req.body.purchase_cost;
  product._cust_id = req.body._cust_id;
  product.localLocation= req.body.localLocation;;						   
  product.userRegContactNumber = req.body.userRegContactNumber;
  product.warrantyEndsDate = req.body.warrantyEndsDate;
  product.warrantyStatus = req.body.warrantyStatus;
  product.warrantyType = req.body.warrantyType;
  product._model_id = req.body._model_id;  
  product.brandName = req.body.brandName;
  product.productName = req.body.productName;
  product.productCategory = req.body.productCategory;
  product.productSubCategory = req.body.productSubCategory;

  
  
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
	    	  product.product_serial_no = req.body.product_serial_no;
	    	  product.product_nick_name = req.body.product_nick_name;
	    	  product.purchase_DT = req.body.purchase_DT;
	    	  product.dealer = req.body.dealer;
	    	  product.is_deleted = req.body.is_deleted;
	    	  product.purchase_cost = req.body.purchase_cost;
	    	  product._cust_id = req.body._cust_id;
	    	  product.localLocation= req.body.localLocation;;						   
	    	  product.userRegContactNumber = req.body.userRegContactNumber;
	    	  product.warrantyEndsDate = req.body.warrantyEndsDate;
	    	  product.warrantyStatus = req.body.warrantyStatus;
	    	  product.warrantyType = req.body.warrantyType;
	    	  product._model_id = req.body._model_id;  
	    	  product.brandName = req.body.brandName;
	    	  product.productName = req.body.productName;
	    	  product.productCategory = req.body.productCategory;
	    	  product.productSubCategory = req.body.productSubCategory;
    

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

//Create endpoint /api/userProduct/:userProductId for PUT
exports.deleteUserProduct =  function(req, res) {
	  // Use the UserProduct model to find a specific user Product
		UserProduct.findById(req.params.userProductId, function(err, product) {
	    if (err)
	    	res.json({status:'901',message:'Expetion occurred while updating user product' 
	        	  ,data:{},error:err});
	    else {
	    	
		    product.is_deleted = true;
		    
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
exports.getAllUserProducts = function(req, res) {
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


// Get all products of any particular user
//Create endpoint /api/userProduct/ for GET
exports.getUserAllProducts = function(req, res) {
	
	UserProduct.find({ _cust_id: req.params.customerId } ,function(err, products) {
		if (err)
	    	res.json({status:'901',message:'Expetion occurred while fetching all user product' 
	      	  ,data:{},error:err});
	    else
	    	res.json({status:'900',message:'All product fetched successfully' 
	      	  ,data:products});
	  });
	
};


//Create endpoint /api/userProduct/:userProductId for GET
exports.insertUploadedDocMetaData  = function(req, res) { 
	UserProduct.findById(req.params.userProductId, function(err, product) {
    if (err)
      	res.json({status:'901',message:'Expetion occurred while fetching user product' 
        	  ,data:{},error:err});
    else
    	product.product_doc_info.push({doc_type:req.files.file ,doc_name: req.files.file ,doc_url: '/var/log/img/'+req.files.file });
    // Save the userProduct and check for errors
    product.save(function(err) {
      if (err)
    	  res.json({status:'901',message:'Expetion occurred while updating user product' 
        	  ,data:{},error:err});
      else 
    	  // record save request is finished lets push this record in user 
    	  res.json({status:'900',message:'User Product image uploaded successfully' 
        	  ,data:product});  
    });
    
  });
};


