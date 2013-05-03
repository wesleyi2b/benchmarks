//# Set up express app, database, session store
//This contains all our environment variables, express settings, and database initializations.
//We should also include our models and routes in some fashion.

var express = require('express')
var path = require('path');

// ## Database
// Require mongodb and mongoose and connect to the database
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('localhost', 'floridacitizen');

require('./models/benchmark')(mongoose);
require('./models/document')(mongoose);

// ### Session store
// Send our express app to connect-mongo to extend connect's default SessionStore
var MongoStore = require('connect-mongo')(express);

var app = express();

// ## Environment set up
app.set('port', process.env.PORT || 3000);
// It is better to use `path.join()` than `__dirname + '/dir'`
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// Enable gzip, etc
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
// Instantiate our MongoStore here with our mongoose connection.
app.use(express.session({
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 14400000 },
	secret: 'You may had never seen nobody with as much skills as me.',
	store: new MongoStore({ mongoose_connection: mongoose.connection })
}));
app.use(express.csrf());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// ## Development only
if ('development' == app.get('env')) {
	//This should give us a nice 500 error page.
	app.use(express.errorHandler());
}

// ## Routing
// Require each of our route files in the /routes folder.
// Each file is a function that runs and uses our app so it's completely independent (unless we rename the file itself)
require('./routes/pages')(app);
require('./routes/benchmarks')(app);
require('./routes/documents')(app);
// require('./routes/users')(app);

if (!module.parent) {
	app.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
}

exports.app = app;
