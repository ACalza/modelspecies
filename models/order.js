var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
	Order:{
		type: String,
		required:true
	},
	class:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Class',
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
	}
});
module.exports = mongoose.model('Order', OrderSchema)