// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var fs = require('fs');
var authController = require('./controllers/auth');
var swagger = require('./swagger/ApiDoc');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27019/dev_test');

// Create our Express application
var app = express();

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

var multer  =  require('multer');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use the passport package in our application
app.use(passport.initialize());

//Create our Express router
//var router = express.Router();

app.use('/api', require('./routes/UserRoute'));
app.use('/api', require('./routes/AddressRoute'));
app.use('/api', require('./routes/ProductRoute'));

// use swagger 
//Couple the application to the Swagger module. 
swagger.getSwagget().setAppHandler(app);
swagger.initializeSwagger(swagger.getSwagget());




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