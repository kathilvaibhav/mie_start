/**
 * http://usejsdoc.org/
 */
var User = require('../model/users');
var logger = require('../utility/logger');
var mongoose = require('mongoose');

//Create endpoint /api/user for POSTS
exports.postUser =  function(req, res) {
  // Create a new instance of the User
  var user = new User();
  console.log(req.body);
  logger.getInfoLogger().log("---Request received to add user account with request body -- "+ req.body);
  // Set the user properties that came from the POST data    
  user.name = req.body.name;  
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  user.auth_method = req.body.authMethod;
  user.auth_code = req.body.authCode;

  // Save the beer and check for errors
  user.save(function(err) {
    if (err) {
        res.json({status:'901',message:'User Record not saved' ,data:{} , error:err});
    }
    else {
        res.json({status:'900',message:'User Record saved' ,data:user});
    }

  });
};

// Create endpoint /api/beers for GET
exports.getUsers = function(req, res) {
  // Use the Beer model to find all beer
	User.find(function(err, users) {
    if (err) {
    	res.send(err);
    } else {
    	res.json(users);
    }
    
  });
	
};

//Create endpoint /api/beers/:beer_id for GET
exports.getUser = function(req, res) {
  // Use the Beer model to find a specific beer	
	User.findById(req.params.user_id).populate('address products').exec( function(err, user) {
    if (err) {             
      res.json({status:'901',message:'Expetion occurred while fetching user data' 
    	  ,data:{},error:err});
    }
    else {
    	if(!user){
    		res.json({status:'901',message:'User record not found' ,data:{}});
    	} else {
    		res.json({status:'900',message:'User record found' ,data:user});
    	}
    	
    }
    
  });
};


//Create endpoint /api/beers/:beer_id for GET
exports.checkUser = function(req, res) {

			
	User.find({auth_method:req.query.authMethod , auth_code:req.query.authCode } ).populate('address products').exec( function(err, user) {
    if (err) {        
    	res.json({status:'901',message:'Expetion occurred while fetching user data' 
      	  ,data:{},error:err});
    }
    else {
    	console.log(user.length );
    	if(!user || user.length <= 0 ){
    		 res.json({status:'901',message:'User Record Not Found' ,data:{}});
    	} else {
    		res.json({status:'900', data:user,message:'User Record Found...'});
    	}
    	
    }
    
  });
};

//Create endpoint /api/beers/:beer_id for GET
exports.getUserByMobile = function(req, res) {
  // Use the Beer model to find a specific beer	
	User.find({ mobile: req.params.mobile } , function(err, user) {
    if (err) {        
    	res.json({status:'901',message:'Expetion occurred while fetching user data' 
        	  ,data:{},error:err});
    }
    else {
    	if(!user){
    		res.json({status:'901',message:'User record not found' ,data:{}});
    	} else {
    		res.json({status:'900',message:'User record found' ,data:user});	
    	}
    	
    }
    
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putUser = function(req, res) {
  // Use the Beer model to find a specific beer
  User.findById(req.params.user_id, function(err, user) {
    if (err)
    	res.json({status:'901',message:'Expetion occurred while fetching user data' 
      	  ,data:{},error:err});

 // Set the user properties that came from the PUT data    
    user.name = req.body.name;   
    user.email = req.body.email;
    user.mobile = req.body.mobile;

    // Save the beer and check for errors
    user.save(function(err) {
      if (err) {
    	  res.json({status:'901',message:'Expetion occurred while fetching user data' 
        	  ,data:{},error:err});
      } else {
    	  
    	  res.json({status:'900',message:'User Record saved' ,data:user});    	      	 
      }
    });
  });
};