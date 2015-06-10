var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SpeciesSchema = new Schema({
	species:{
		type:String,
		required: true
	},
	genus:{
		type: Schema.Types.ObjectId,
		ref: 'Genus',
		required: true
	},
	family:{
		type: Schema.Types.ObjectId,
		ref: 'Family',
		required: true
	},
	order:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Order',
		required: true
	},
	class:{
		type: Schema.Types.ObjectId,
   	 	ref: 'class',
		required: true
	},
	domain: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Domain',
		required: true
	},
	phylum: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Phylum',
		required: true
	},
	members: {
		type: [Schema.Types.Mixed]
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
