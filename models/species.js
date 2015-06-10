var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SpeciesSchema = new Schema({
	domain: {
		type:String,
		required: true
	},
	phylum: {
		type: String,
		required: true
	},
	class: {
		type: String,
		required: true
	},
	order: {
		type: String,
		required: true
	},
	family: {
		type: String,
		required: true
	},
	genius: {
		type: String,
		required: true
	},
	species: {
		type: String,
		required: true
	},
	strain: {
		type: String
	},
	misc: {
		type: String
	},
	genome: {
		type: String
	},
	JSONCreated: {
		type: String
	}
});

module.exports = mongoose.model('Species', SpeciesSchema);
