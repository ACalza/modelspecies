var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhylumSchema = new Schema({
	domain: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Domain',
		required:true
	},
	phylum: {
		type: String,
		required: true
	}
	members: {
		type: [Schema.Types.ObjectId],
		required:true
	}
});
module.exports = mongoose.model('Phylum', PhylumSchema);