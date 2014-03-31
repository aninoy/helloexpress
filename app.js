
/**
 * Module dependencies.
 */

var express = require('express');
// var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

app.get('/', function(req, res){
	res.render('home', {title: "Building webapps in Node with Express"});
});

app.get('/hi', function(req, res){
	var message = "<h1>Aninoy says Hi!</h1>";
	res.send(message);
});

// app.get('/users/:userId', function(req, res){
// res.send("<h1>Hello User #" + req.params.userId + "<h1>");
// });

app.post('/users', function (req, res) {
	res.send("Creating a new user with the name "+req.body.username+".");
});

app.get(/\/users\/(\d*)\/?(edit)?/, function  (req, res) {
	var message = "user #" + req.params[0] + "'s profile";
	if(req.params[1] === 'edit')
	{
		message = "Editing " + message;
	}
	else
	{
		message = "Viewing " + message;
	}
	res.send(message);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
