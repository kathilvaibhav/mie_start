/**
 * http://usejsdoc.org/
 */
var Address = require('../model/address');

//Create endpoint /api/beers for POSTS
exports.postAddress =  function(req, res) {
  // Create a new instance of the Beer model
  var address = new Address();

  // Set the user properties that came from the POST data    
  address.houseNo = req.body.HouseNo;
  address.name = req.body.Name;
  address.address = req.body.address;
  address.city = req.body.City;
  address.pincode = req.body.Pincode;
  address._cust_id = req.body.user_id;
  address.addressType = req.body.AddressType;
  address.state = req.body.state;
  address.locality = req.body.locality;
  address.landmark = req.body.landmark;
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
    address.houseNo = req.body.HouseNo;
    address.name = req.body.Name;
    address.address = req.body.address;
    address.city = req.body.City;
    address.pincode = req.body.Pincode;
    address._cust_id = req.body.user_id;
    address.addressType = req.body.AddressType;
    address.state = req.body.state;
    address.locality = req.body.locality;
    address.landmark = req.body.landmark;

    // Save the beer and check for errors
    address.save(function(err) {
      if (err)
        res.send(err);

      res.json(address);
    });
  });
};