var mongoose = require('mongoose');
require('../lib/connection');

var Species = require('../models/species');
var Genus = require('../models/genus');
var Family = require('../models/family');
var Order = require('../models/order');
var Class = require('../models/class');
var Phylum = require('../models/phylum');
var Domain = require('../models/domain');
var addSpecie = require('../lib/species');
var fs = require('fs');

var block = require('node-block').block;
var async = require('async');
//inspired by http://techslides.com/convert-csv-to-json-in-javascript

fs.readFile('../database/modelspecies.csv', 'utf8', function(err, data){
	if(err){
		console.log(err);
		return;
	}
	
	var lines = data.split("\r");
    var headers = lines[0].split(",");
	var domain, phylum, clas, order, family, genus, species;
  	lines.splice(0, 0);
	//async really pisses me off...
	var iterator = function(index){
		if(index === lines.length)
			return;
		var column = {};
  	  	var currentline = lines[index].split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  column[headers[j]] = currentline[j];
  	  	}
	
		column["domain"] = currentline[0];
		column["phylum"] = currentline[1];
		column["class"] = currentline[2];
		column["order"] = currentline[3];
		column["family"] = currentline[4];
		column["genus"] = currentline[5];
	
                console.log(column);

		addSpecie(column, function(row){
			console.log(index);
			//iterator(index + 1);
		});
	}
	iterator(5);
	//remove first index
	//for(var i=4; i<lines.length; i++) {
		//meant to say row, but was too lazy to rename
  	/*async.eachSeries(lines, function iterator(line, callback){
		var column = {};
  	  	var currentline = line.split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  column[headers[j]] = currentline[j];
  	  	}
		column["domain"] = currentline[0];
		column["phylum"] = currentline[1];
		column["class"] = currentline[2];
		column["order"] = currentline[3];
		column["family"] = currentline[4];
		column["genus"] = currentline[5];
		console.log(column);
		addSpecie(column, function(row){
			callback();
		});
  	});
		
		var column = {};

  	  	var currentline = lines[i].split(",");
 	   	//put species
  	  	for(var j=headers.length - 5;j<headers.length;j++){
  			  column[headers[j]] = currentline[j];
  	  	}
		column["domain"] = currentline[0];
		column["phylum"] = currentline[1];
		column["class"] = currentline[2];
		column["order"] = currentline[3];
		column["family"] = currentline[4];
		column["genus"] = currentline[5];
		
		addSpecie(column, function(row){
			
		});
		return;
		
		
		
    }*/
});




