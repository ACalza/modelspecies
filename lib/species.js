var mongoose = require('mongoose');
var Species = require('../models/species');
var Genus = require('../models/genus');
var Family = require('../models/family');
var Order = require('../models/order');
var Class = require('../models/class');
var Phylum = require('../models/phylum');
var Domain = require('../models/domain');

//Column is either Species, Genus, Family, Order, Phylum or Domain
//finds the element and number
var findElement = function(element, Column){
	Column.findOne({ename: element.ename}, function(err, item){
		if(err)
			return console.log(err);
		return item;
	});
}
var saveElement = function(element){
	element.save(function(err, savedElement){
		if(err)
			return console.log(err);
		return savedElement;
	})
}

//This will find the element, see if it exists, and then save it.
var saveElementPC = function(elementChildModel, elementParent, ColumnParent, callback){
	ColumnParent.findOne({ename: elementParent.ename}, function(err, item){
		if(err)
			return console.log(err);
		var cparent = item;
	
	//If item exist, push the current object id to the member of the above
		if(cparent){
			cparent.members.push(elementChildModel._id);
			console.log(cparent);
			saveElement(cparent);
			elementChildModel.cparent = cparent._id;
			saveElement(elementChildModel);
			//found match
			callback(null);
		
		}else{
			var saveParent = new ColumnParent(elementParent);
			saveParent.members.push(elementChildModel._id);
			saveParent.save(function(err, savedParent){
				if(err)
					return console.log(err);
				elementChildModel.cparent = savedParent._id;
				elementChildModel.save(function(err, savedChild){
					if(err)
						return console.log(err);
					callback(savedParent);
						
				});
			});
		
		}
	});
}
//all paramters are JSON Objects to simplify code
//The recursive part would be wierd since i have different JSON's
//I dont think this can be done recusively.
var addSpecie = function(specie, genus, family, order, clas, phylum, domain){
	var specie = new Species(specie);
	specie.save(function(err, savedSpecie){
		if(err)
			return console.log(err);
		saveElementPC(savedSpecie, genus, Genus, function(genusModel){
			if(genusModel)
				saveElementPC(genusModel, family, Family, function(familyModel){
					if(familyModel)
						saveElementPC(familyModel, order, Order, function(orderModel){
							if(orderModel)
								saveElementPC(orderModel, clas, Class, function(classModel){
									if(classModel)
										saveElementPC(classModel, phylum, Phylum, function(phylumModel){
											if(phylumModel)
												saveElementPC(phylumModel, domain, Domain, function(done){});
											console.log("done");
											
										});
									
								});
							
						});
						
					});
				});
		});
}	//saveElementPC(savedSpecie, genus, Genus);


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