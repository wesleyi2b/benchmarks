var moment = require('moment');
var options = require('./options.json');

module.exports = function (mongoose) {
	
	var DocumentSchema = new mongoose.Schema({
		'benchmark': { type: mongoose.Schema.Types.ObjectId, ref: 'Benchmark' },
		'content': { type: String },
		'created': { default: Date.now(), type: Date },
		'order': { default: 0, type: Number },
		'tags': Array,
		'title': { default: 'Title', type: String },
		'type': { default: 'video', type: String },
		'updated': { default: Date.now(), type: Date }
	}, options);

	DocumentSchema.virtual('moment').get(function () {
		return moment(this.updated).fromNow();
	});

	mongoose.model('Document', DocumentSchema);

}