var mongoose = require('mongoose');
require('../lib/connection');
var Species = mongoose.model('Species');
var fs = require('fs')


//inspired by http://techslides.com/convert-csv-to-json-in-javascript

var data = fs.readFile('./database/modelspecies.csv', 'utf8', function(err, data){
	if(err){
		return console.log(err);
	}
	var lines = data.split("\r");

    var species = [];
    var headers = lines[0].split(",");
    for(var i=1;i<lines.length;i++){
 
  	  	var obj = {};
  	  	var currentline = lines[i].split(",");
 
  	  	for(var j=0;j<headers.length;j++){
  			  obj[headers[j]] = currentline[j];
  	  	}
 	 	species.push(obj);
		
    }
	Species.create(species, function(error){
		if(error){
			return console.error('Error: ' + error);
		}
		console.log("Done adding species, CTRL + C to quit");
	});
});




