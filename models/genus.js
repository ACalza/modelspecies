var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GenusSchema = new Schema({
	genus:{
		type:String,
		required: true
	},
	family:{
		type: Schema.Types.ObjectId,
		ref: 'Family',
		required: true
	},
	members: {
		type: [Schema.Types.ObjectId]
	}
});
module.exports = mongoose.model('Genus', GenusSchema);