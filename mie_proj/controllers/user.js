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
  logger.getInfoLogger().log("info","---Request received to add user account with request body -- "+ req.body);
  // Set the user properties that came from the POST data    
   user.name = req.body.name;  
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  user.authMethod = req.body.authMethod;
  user.authCode = req.body.authCode;
  user.userImageUrl = req.body.userImageUrl;
  user.isSavedOnCloud = req.body.isSavedOnCloud;
  user.mMIEId = req.body.mMIEId;

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

			
	User.find({authMethod:req.query.authMethod , authCode:req.query.authCode } ).populate('address products').exec( function(err, user) {
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
     user.userImageUrl = req.body.userImageUrl;
  	user.isSavedOnCloud = req.body.isSavedOnCloud;
  	user.authMethod = req.body.authMethod;
  user.authCode = req.body.authCode;
  	user.mMIEId = req.body.mMIEId;
    

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


//Create endpoint /api/userProduct/:userProductId for GET
exports.saveUserFeedback  = function(req, res) { 
	 User.findById(req.params.user_id, function(err, user) {
    if (err)
      	res.json({status:'901',message:'Expetion occurred while fetching user ' 
        	  ,data:{},error:err});
    else
    	now = new Date();
    	user.feedback.push
    	({feedback_text:req.body.feedback_text ,
    		feedback_rating:req.body.feedback_rating ,feedback_ts : now  });
    
    // Save the userProduct and check for errors
    user.save(function(err) {
      if (err)
    	  res.json({status:'901',message:'Expetion occurred while updating user' 
        	  ,data:{},error:err});
      else 
    	  // record save request is finished lets push this record in user 
    	  res.json({status:'900',message:'User Feedback is saved...' 
        	  ,data:user});  
    });
    
  });
};