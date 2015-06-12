var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
	Order:{
		type: String,
		required:true
	},
	class:{
		type: Schema.Types.ObjectId,
   	 	ref: 'Class'
	},
	members: {
		type: [Schema.Types.Mixed]
	}
});
module.exports = mongoose.model('Order', OrderSchema)