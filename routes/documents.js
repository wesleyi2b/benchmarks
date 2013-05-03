var Document = require('mongoose').model('Document');

module.exports = function (app) {

	app.get('/documents', function (req, res) {
		Document.find({}, null, {sort: 'type'}, function (err, documents) {
			res.render('documents', {documents: documents});
		});
	});

	app.get('/documents/:id', function (req, res) {
		Document.findOne({_id: req.params.id}, function (err, document) {
			res.render('document', {document: document});
		});
	})

}