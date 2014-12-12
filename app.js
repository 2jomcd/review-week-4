var express = require('express'),
		ejs 		= require('ejs'),
		app			= express();

app.set('view engine', 'ejs');

app.listen(3000, function() {
	console.log('Server is up!');
});

app.get('/', function(req, res) {
	res.render('index');
});
