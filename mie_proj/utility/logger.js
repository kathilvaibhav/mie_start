
var winston = require("winston");

var infoLogger = new (winston.Logger)({
	level: 'info',
    transports: [
      new (winston.transports.File)({ filename: 'info.log' })
    ]
  });


var errorLogger = new (winston.Logger)({
	level: 'error',
    transports: [
      new (winston.transports.File)({ filename: 'error.log' })
    ]
  });


exports.getInfoLogger = function() {
	return infoLogger;
};

exports.getErrorLogger = function() {
	return errorLogger;
};