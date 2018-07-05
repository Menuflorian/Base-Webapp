var mongoose = require('mongoose');

//scripts Schema
var DualboxExportsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  corp: {
    type: String,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  ownerName: {
    type: String,
    default: mongoose.Schema.username
  },

});

var DualboxExports = module.exports = mongoose.model('DualboxExports', DualboxExportsSchema);
