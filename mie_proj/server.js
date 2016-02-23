// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var fs = require('fs');
var morgan = require('morgan')
var authController = require('./controllers/auth');
var swagger = require('./swagger/ApiDoc');
var winMid = require("express-winston-middleware");
var winston = require("winston");

//create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream('/var/log/mie/access' + '/access.log', {flags: 'a'})

// Connect to the MIE Database MongoDB
mongoose.connect('mongodb://localhost:27019/dev_test');

// Create our Express application
var app = express();

//Allow Request
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

//setup the morgan logger 
app.use(morgan('combined', {stream: accessLogStream}));

var multer  =  require('multer');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
 extended: true
}));

//Use the passport package in our application
app.use(passport.initialize());

//Create our Express router
var router = express.Router();


 
router.use(function (req, res, next) {
         console.log('Time:',displayTime());
         next();
});
 
 
router.use(new winMid.request({
         transports: [
           new (winston.transports.File)({ filename: '/var/log/mie/traffic/requestTraffic.log' })
         ]
       }, {
         // Metadata to add to each log response.
         Router: "traffic"
       }));

app.use('/', router);

router.use('/api', require('./routes/UserRoute'));
router.use('/api', require('./routes/AddressRoute'));
router.use('/api', require('./routes/ProductRoute'));
router.use('/api', require('./routes/UserProductRoute'));

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



// Start the server at this port
app.listen(8080);

function displayTime() {
    var str = "";
 
    var currentTime = new Date()
   
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
 
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}
