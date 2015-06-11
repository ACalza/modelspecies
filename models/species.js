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
