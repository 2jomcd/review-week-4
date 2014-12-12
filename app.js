var express = require('express'),
		ejs 		= require('ejs'),
		app			= express(),
		path		= require('path'),
		bodyParser 	  = require('body-parser'),
		cookieParser  = require('cookie-parser'),
		session       = require('express-session'),
		LocalStrategy = require('passport-local').Strategy,
		passport      = require('passport'),
		db						= require('./db.js');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.listen(3000, function() {
	console.log('Server is up!');
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/users/new', function(req, res) {
	res.render('users/new');
});

app.post('/users', function(req, res) {
	db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [req.body.username, req.body.email, req.body.password], function(err, dbRes) {
			if (!err) {
				res.redirect('/sessions/new');
			}
	});
});

app.get('/sessions/new', function(req, res) {
	res.render('sessions/new');
});

app.post('/sessions', passport.authenticate('local', 
  {failureRedirect: '/sessions/new'}), function(req, res) {
    db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [], function() {});
});






























