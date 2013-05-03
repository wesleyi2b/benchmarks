var moment = require('moment');
var options = require('./options.json');

module.exports = function (mongoose) {
	
	var BenchmarkSchema = new mongoose.Schema({
		'benchmark': { type: String },
		'description': { type: String },
		'documents': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
		'created': { default: Date.now(), type: Date },
		'order': { default: 0, type: Number },
		'category': { default: 0, type: Number },
		'tags': Array,
		'title': { default: 'Title', type: String },
		'updated': { default: Date.now(), type: Date }
	}, options);

	BenchmarkSchema.virtual('moment').get(function () {
		return moment(this.updated).fromNow();
	});

	mongoose.model('Benchmark', BenchmarkSchema);

}