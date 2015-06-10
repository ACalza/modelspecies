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
	order:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Order',
		required: true
	},
	class:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Class',
		required: true
	},
	phylum: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Phylum',
		required: true
	},
	domain: {
		type: Schema.Types.ObjectId,
   	 	ref: 'Domain',
		required: true
	},
	
	members: {
		type: [Schema.Types.Mixed]
	}
});
module.exports = mongoose.model('Genus', GenusSchema);