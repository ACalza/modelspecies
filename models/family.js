var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FamilySchema = new Schema({
	family:{
		type:String,
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
module.exports = mongoose.model('Family', FamilySchema);