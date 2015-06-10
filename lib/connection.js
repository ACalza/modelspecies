var mongoose = require('mongoose');
var dbUrl = 'mongodb://albert:ass@ds041432.mongolab.com:41432/heroku_app37313258';

mongoose.connect(dbUrl);
// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
	});
});

require('../models/domain');
require('../models/phylum');
require('../models/class');
require('../models/order');
require('../models/family');
require('../models/genus');
require('../models/species');


