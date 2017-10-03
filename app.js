var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var about = require('./routes/about');
var solutions = require('./routes/solutions');
var news = require('./routes/news');
var blog = require('./routes/blog');
var contacts = require('./routes/contacts');
var reviews = require('./routes/reviews');
var erp = require('./routes/erp');
var interviews = require('./routes/interviews');
var priceList = require('./routes/price-list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

console.log(path.join(__dirname, 'styles'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'public/stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false,
  prefix: '/stylesheets/'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about', about);
app.use('/solutions', solutions);
app.use('/news', news);
app.use('/blog', blog);
app.use('/contacts', contacts);
app.use('/reviews', reviews);
app.use('/erp', erp);
app.use('/interviews', interviews);
app.use('/price_list', priceList);

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
