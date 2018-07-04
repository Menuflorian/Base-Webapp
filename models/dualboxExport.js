var mongoose = require('mongoose');

//scripts Schema
var DualboxExportsSchema = mongoose.Schema({
	name: {
		ownerId: {
	            type: mongoose.Schema.Types.ObjectId,
	            ref: "DualboxExports"
	        },
		type: String,
	},
	corp: {
		type: String,
	},
	ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
});

var DualboxExports = module.exports = mongoose.model('DualboxExports', DualboxExportsSchema);
