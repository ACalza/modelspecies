var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GenusSchema = new Schema({
	cname:{
		type:String,
		required: true
	},
	cparent:{
		type: Schema.Types.ObjectId,
		ref: 'Family'
	},
	members: {
		type: [Schema.Types.ObjectId]
	}
});
module.exports = mongoose.model('Genus', GenusSchema);