var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SpeciesSchema = new Schema({
	cname:{
		type:String,
		required: true
	},
	cparent:{
		type: Schema.Types.ObjectId,
		ref: 'Genus'
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
