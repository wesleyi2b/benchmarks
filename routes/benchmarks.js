var Benchmark = require('mongoose').model('Benchmark');

module.exports = function (app) {
	
	app.get('/benchmarks', function (req, res) {
		Benchmark.find({}, null, {sort: {order: 1}}).populate({path: 'documents', options: {sort: {order: 1}}}).exec(function (err, benchmarks) {
			res.render('benchmarks', {benchmarks: benchmarks});
		});
	});

	app.get('/benchmarks/:id', function (req, res) {
		Benchmark.findOne({_id: req.params.id}).populate({path: 'documents', options: {sort: {order: 1}}}).exec(function (err, benchmark) {
			res.render('benchmark', {benchmark: benchmark})
		});
	});

}