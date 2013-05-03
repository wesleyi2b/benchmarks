var Benchmark = require('mongoose').model('Benchmark');
var Document = require('mongoose').model('Document');

module.exports = function (app) {
	
	app.get('/', function (req, res) {
		res.render('index');
	});

	app.get('/help', function (req, res) {
		res.render('help');
	});

}