var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FamilySchema = new Schema({
	family:{
		type:String,
		required: true
	},
	order:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Order'
	},
	members: {
		type: [Schema.Types.Mixed]
	}
});
module.exports = mongoose.model('Family', FamilySchema);