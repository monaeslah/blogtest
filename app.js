var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
///must be change

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'panel/build'), {maxAge: '7d', index: false}));

app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json()); 
app.use(bodyParser.json({
  type: 'application/vnd.api+json'//JSON API
})); 


app.use(session({
  secret: 'meslah',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/', indexRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");//CORS (Cross-Origin Resource Sharing) header.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
console.log("this is test 1")

module.exports = app;
