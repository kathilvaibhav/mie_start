/**
 * http://usejsdoc.org/
 */
var Address = require('../model/address');

//Create endpoint /api/beers for POSTS
exports.postAddress =  function(req, res) {
  // Create a new instance of the Beer model
  var address = new Address();

  // Set the user properties that came from the POST data    
  address.HouseNo = req.body.HouseNo;
  address.TowerNo = req.body.TowerNo;
  address.address = req.body.address;
  address.City = req.body.City;
  address.Country = req.body.Country;
  address.Pincode = req.body.Pincode;
  address.isDefault = req.body.isDefault;
  address._cust_id = req.body.user_id;
  address.AddressType = req.body.AddressType;
  address.State = req.body.state;
  // Save the beer and check for errors
  address.save(function(err) {
    if (err)
      res.json({message:'Address Record not saved' + err ,data:address});
    else
    res.json({ message: 'Address Record is added!', data: address });
  });
};

// Create endpoint /api/beers for GET
exports.getUserAllAddress = function(req, res) {
  // Use the Beer model to find all beer
	Address.find({ _cust_id: req.params.user_id } ,function(err, users) {
    if (err)
      res.send(err);
    else
    res.json(users);
  });
};

//Create endpoint /api/beers/:beer_id for GET
exports.getAddress = function(req, res) {
  // Use the Beer model to find a specific beer
	Address.findById(req.params.address_id, function(err, address) {
    if (err)
      res.send(err);

    res.json(address);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putAddress = function(req, res) {
  // Use the Beer model to find a specific beer
	Address.findById(req.params.address_id, function(err, address) {
    if (err)
      res.send(err);

   // Set the user properties that came from the POST data    
    address.HouseNo = req.body.HouseNo;
    address.TowerNo = req.body.TowerNo;
    address.address = req.body.address;
    address.City = req.body.City;
    address.Country = req.body.Country;
    address.Pincode = req.body.Pincode;
    address.isDefault = req.body.isDefault;
    address._cust_id = req.body.user_id;

    // Save the beer and check for errors
    address.save(function(err) {
      if (err)
        res.send(err);

      res.json(address);
    });
  });
};