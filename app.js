var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var multer = require('multer');
var index = require('./routes/index');
var mongoose = require('mongoose');

mongoose.connect("localhost:27017/films");


var app = express();


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'Layout', extname: '.hbs'}));
app.set('view engine', '.hbs');  // html engine

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json()); //parse html, json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/', index); //home

//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
