// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var swagger = require("swagger-node-express");
var passport = require('passport');
var fs = require('fs');
var authController = require('./controllers/auth');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27019/dev_test');

// Create our Express application
var app = express();

var multer  =  require('multer');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use the passport package in our application
app.use(passport.initialize());

// use swagger 


//Couple the application to the Swagger module. 
swagger.setAppHandler(app);

var findById = {
		  'spec': {
		    "description" : "Operations about pets",
		    "path" : "/pet/{petId}",
		    "notes" : "Returns a pet based on ID",
		    "summary" : "Find pet by ID",
		    "method": "GET",
		    "parameters" : [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
		    "type" : "Pet",
		    "errorResponses" : [swagger.errors.invalid('id'), swagger.errors.notFound('pet')],
		    "nickname" : "getPetById"
		  }
		};
		 
swagger.addGet(findById);
		


swagger.addValidator(
		  function validate(req, path, httpMethod) {
		    //  example, only allow POST for api_key="special-key" 
		    if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod) {
		      var apiKey = req.headers["api_key"];
		      if (!apiKey) {
		        apiKey = url.parse(req.url,true).query["api_key"];
		      }
		      if ("special-key" == apiKey) {
		        return true; 
		      }
		      return false;
		    }
		    return true;
		  }
		);

swagger.configure("http://petstore.swagger.wordnik.com", "0.1");

// Create our Express router
//var router = express.Router();

app.use('/api/userAPI', require('./routes/UserRoute'));
app.use('/api/addressAPI', require('./routes/AddressRoute'));


// Multer
//Using Multer for file uploads.
app.use(multer({
    dest: './public/profile/img/',
    limits: {
        fieldNameSize: 50,
        files: 1,
        fields: 5,
        fileSize: 1024 * 1024
    },
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {
        console.log('Starting file upload process.');
        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return false;
        }
    },
    inMemory: true //This is important. It's what populates the buffer.
}));
var imageUpload = function(req, res) {
    var file = req.files.file,
        path = './public/profile/img/';

    // Logic for handling missing file, wrong mimetype, no buffer, etc.

    var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
        fileName = file.name;
    var stream = fs.createWriteStream(path + fileName);
    stream.write(buffer);
    stream.on('error', function(err) {
        console.log('Could not write file to memory.');
        res.status(400).send({
            message: 'Problem saving the file. Please try again.'
        });
    });
    stream.on('finish', function() {
        console.log('File saved successfully.');
        var data = {
            message: 'File saved successfully.'
        };
        res.jsonp(data);
    });
    stream.end();
    console.log('Stream ended.');
};


app.route('/api/photo').post(imageUpload);

// Register all our routes with /api
//app.use('/api', router);



// Start the server
app.listen(3000);