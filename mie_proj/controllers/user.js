/**
 * http://usejsdoc.org/
 */
var User = require('../model/users');
var mongoose = require('mongoose');

//Create endpoint /api/user for POSTS
exports.postUser =  function(req, res) {
  // Create a new instance of the User
  var user = new User();
  console.log(req.body);
  // Set the user properties that came from the POST data    
  user.Name = req.body.name;  
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  // Save the beer and check for errors
  user.save(function(err) {
    if (err) {
        res.json({message:'User Record not saved' + err ,data:{}});
    }
    else {
        res.json({data: user });
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
      res.send(err);
    }
    else {
    	if(!user){
    		 res.json({message:'User Record Not Found' ,data:{}});
    	} else {
    		res.json(user);
    	}
    	
    }
    
  });
};


//Create endpoint /api/beers/:beer_id for GET
exports.getUserByMobile = function(req, res) {
  // Use the Beer model to find a specific beer	
	User.find({ mobile: req.params.mobile } , function(err, user) {
    if (err) {        
    	res.json({message:'User Record Not Found' ,data:{}});
    }
    else {
    	if(!user){
    		 res.json({message:'User Record Not Found' ,data:{}});
    	} else {
    		res.json(user);
    	}
    	
    }
    
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putUser = function(req, res) {
  // Use the Beer model to find a specific beer
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

 // Set the user properties that came from the PUT data    
    user.Name = req.body.name;   
    user.email = req.body.email;
    user.mobile = req.body.mobile;

    // Save the beer and check for errors
    user.save(function(err) {
      if (err) {
    	  res.send(err);
      } else {
    	  res.json(user);
      }
    });
  });
};