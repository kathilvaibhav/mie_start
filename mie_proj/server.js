// Load required packages
//process.env.TMPDIR = '/home/nitin/tmp';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var fs = require('fs');
var morgan = require('morgan');
var authController = require('./controllers/auth');
var swagger = require('./swagger/ApiDoc');
var winMid = require("express-winston-middleware");
var winston = require("winston");

//create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream('/var/log/mie' + '/access.log', {flags: 'a'})

// Connect to the MIE Database MongoDB
mongoose.connect('mongodb://localhost:27019/dev_test');

// Create our Express application
var app = express();




// setup static location for project

app.use('/static', express.static('/var/mie/products/'));

//Allow Request
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

//setup the morgan logger 
app.use(morgan('combined', {stream: accessLogStream}));


//Use the passport package in our application
app.use(passport.initialize());

//Create our Express router
var router = express.Router();

router.use(bodyParser.json({
 extended: true,
 limit: 10 * 1024 * 1024
}));

//Use the body-parser package in our application
router.use(bodyParser.urlencoded({
  extended: true
}));


 
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

app.use('/test', router);

router.use('/api', require('./routes/UserRoute'));
router.use('/api', require('./routes/AddressRoute'));
router.use('/api', require('./routes/ProductRoute'));
router.use('/api', require('./routes/UserProductRoute'));
//router.use('/api', require('./routes/FileUploadRoute'));

// use swagger 
//Couple the application to the Swagger module. 
swagger.getSwagget().setAppHandler(app);
swagger.initializeSwagger(swagger.getSwagget());

var busboy = require("connect-busboy");
app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024*1000
  }
}));


 var multipart = require('multiparty');
var fs = require('fs');
 app.post('/upload', function(req, res){

    var form = new multipart.Form();

    form.parse(req, function(err, fields, files) {   
       console.log(files);//list all files uploaded 
       //put in here all the logic applied to your files.   
       
        var file = files.file[0];
        var tempPath = file.path;
        console.log(tempPath);
        console.log(__dirname);
        var targetPath = __dirname + '/uploads' + '/' + file.originalFilename;
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
            	console.log(err);
                throw err
            }
           // logger.debug(file.name + " upload complete for user: " + username);
            return res.json({status:'900', 
            	message:"datadone"})
        });
    });
       
   
            
  }); 

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
