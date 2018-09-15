var mongoose = require('mongoose');

//Schema scripts
var ProjectsSchema = mongoose.Schema({
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
  },
  creationdate: {
    type: Date,
  },
  lastedit: {
    type: Date,
  },
});
var Projects = module.exports = mongoose.model('Projects', ProjectsSchema);
