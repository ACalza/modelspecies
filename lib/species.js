var mongoose = require('mongoose');
var Species = require('../models/species');
var Genus = require('../models/genus');

//Column is either Species, Genus, Family, Order, Phylum or Domain
var findElement = function(element, column){
	column.findOne({column.cname: element}, function(err, item){
		if(err)
			return console.log(err);
		return item;
	})
}
//all paramters are JSON Objects to simplify code
var addSpecie = function(specie, genus){
	
}

var test_addSpecie = function(specie, genus) {
	var s = {}, g = {}, f ={}, o= {}, c = {}, p = {}, d = {};
	
	var s = specie;
	
	var _s = new Species(s);
	
	_s.save(function(err, savedSpecie) {
		if (err)
			return console.log(err);
		
		Genus.findOne({genus: genus}, function(err, g) {
			if (err)
				return console.log(err);
			
			if (!g) {
				g = {
					genus: genus,
					members: [savedSpecie._id]
				}
				var _g = new Genus(g);
		
				_g.save(function(err, savedGenus) {
					if(err)
						return console.log(err);
					savedSpecie.genus = savedGenus._id;
					savedSpecie.save(function(err, savedSpecie2) {
						console.log("finished path 1");
					});
				});
			} else {
				g.members.push(savedSpecie._id);
				g.save(function(err, savedGenus){if(err) console.log(err)});
				savedSpecie.genus = g._id;
				savedSpecie.save(function(err, savedSpecie2){console.log(err)});
				console.log("finished path 2");
			}
			
			});
		});
	}
module.exports = addSpecie;