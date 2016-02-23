// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// Define schema for user
var userSchema = new Schema({  
	name: String,
//  UserName:   { type: String, required: true ,unique: true},
//  Password:   { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  auth_method: { type: String, required: true},
  auth_code: { type: String, required: true},
  mobile:{ type: Number,required: true ,unique: true , min: 1000000000, max: 9999999999},		
  registratioDate: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  isActive: Boolean,
  address : [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  products : [{ type: Schema.Types.ObjectId, ref: 'UserProduct' }],
  feedback : [{Feedback_Text:String}]
  
});




//userSchema.methods.verifyPassword = function(Password, cb) {
//	  bcrypt.compare(Password, this.Password, function(err, isMatch) {
//	    if (err) return cb(err);
//	    cb(null, isMatch);
//	  });
//	};
//
//	
//	// Execute before each user.save() call
//	userSchema.pre('save', function(callback) {
//	  var user = this;
//
//	  // Break out if the password hasn't changed
//	  if (!user.isModified('password')) return callback();
//
//	  // Password changed so we need to hash it
//	  bcrypt.genSalt(5, function(err, salt) {
//	    if (err) return callback(err);
//
//	    bcrypt.hash(user.password, salt, null, function(err, hash) {
//	      if (err) return callback(err);
//	      user.password = hash;
//	      callback();
//	    });
//	  });
//	});	

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;

