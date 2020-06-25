var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require("http");
// var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/auth');

var app = express();
const config = require('config');
// console.log(config,'dd')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set("port", process.env.PORT||config.get('port'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(cors({origin: [
  "http://localhost:4200",
  "http://10.0.0.99:4200"
  ], credentials: true}));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
http.createServer(app).listen(app.get("port"), function() {
  console.log("Starting " + config.get("name") + " web server");
  console.log("Express Http server listening on port " + app.get("port"));
});
module.exports = app;
