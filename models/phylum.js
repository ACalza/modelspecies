var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhylumSchema = new Schema({
	domain: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Domain'
	},
	phylum: {
		type: String,
		required: true
	},
	members: {
		type: [Schema.Types.ObjectId]
	}
});
module.exports = mongoose.model('Phylum', PhylumSchema);