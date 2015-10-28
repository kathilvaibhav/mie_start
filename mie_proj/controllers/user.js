/**
 * http://usejsdoc.org/
 */
var User = require('../model/users');

//Create endpoint /api/beers for POSTS
exports.postUser =  function(req, res) {
  // Create a new instance of the Beer model
  var user = new User();

  // Set the user properties that came from the POST data    
  user.FirstName = req.body.firstName;
  user.LastName = req.body.lastName;  
  user.email = req.body.email;
  user.mobile = req.body.mobile;
  // Save the beer and check for errors
  user.save(function(err) {
    if (err)
      res.json({message:'User Record not saved' + err ,data:user});
    else
    res.json({ message: 'User Record is added!', data: user });
  });
};

// Create endpoint /api/beers for GET
exports.getUsers = function(req, res) {
  // Use the Beer model to find all beer
	User.find(function(err, users) {
    if (err)
      res.send(err);
    else
    res.json(users);
  });
	
};

//Create endpoint /api/beers/:beer_id for GET
exports.getUser = function(req, res) {
  // Use the Beer model to find a specific beer
	User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putUser = function(req, res) {
  // Use the Beer model to find a specific beer
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

 // Set the user properties that came from the PUT data    
    user.FirstName = req.body.firstName;
    user.LastName = req.body.lastName;    
    user.email = req.body.email;
    user.mobile = req.body.mobile;

    // Save the beer and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};