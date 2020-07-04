/**
 * Created by nishu on 30-march-18.
 */

var express = require("express"),
  bodyParser = require("body-parser"),
  errorHandler = require("errorhandler"),
  morgan = require("morgan"),
  routes = require("./routes"),
  http = require("http"),
  path = require("path");
app = module.exports = express();
https = require("https");
const fs = require("fs");
var cors = require("cors");
var flash = require('connect-flash');
const session = require("express-session");
const url = require('url')
var cookieParser = require('cookie-parser');

const expressJwt = require('express-jwt');



const users = require("./routes/portal/manage/user");


var appDir = path.dirname(require.main.filename);
var multer = require('multer');
const config = require('config');

const publicKEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfBiC4cfKs7aGJFAKvpZ+B5pKG
JiPtI9N/Of/nzOq9cxj1HG6wlOYdK4lP4H+JgJjC2KT+9bgxr9ROp5WIBrvjb6mQ
ltwsW4wm+iiEuOxC8FjgoyD5/1MIJf3MdLP9s6t7/KHZKN7P6hxwJAVbgyiRsZGS
YaM80n/fEHF1zKXSSwIDAQAB
-----END PUBLIC KEY-----`;


app.use(cookieParser("secret"));



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});




/**
 * Configuration
 */



app.use(flash());
// all environments
app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://10.0.0.99:5000"
  ], credentials: true
}));
//app.set("port", 8000);
app.set("port", config.get('port'));




app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({
  cookie: {
    maxAge: 60000
  },
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  name: "Check this"
}));

app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
var env = process.env.NODE_ENV || "development";
app.use(express.static('./'));
 const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];


app.get('*', (req, res) => {
  
  // res.redirect('https://' + req.headers.host + req.url);
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    console.log("requested url", req.url)
    res.sendFile(path.resolve(`public/website/${req.url}`));
  } else {
    res.sendFile(path.resolve('public/website/index.html'));
  }
});

// app.use(expressJwt({secret: publicKEY, algorithms: ['RS256'],}).unless({
//   path: [
//             
//   ]
//  })
// );
   app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('error');
    }
  });
 
app.use("/portal/users", users);




// development only
if (env === "development") {
  app.use(errorHandler());
}

// production only
if (env === "production") {
  // TODO
}

/**
 * Routes
 */

app.get("/dev/", function (request, response) {
  //  console.log("CALLEDDDDD")
});


// List of extension from Angular


// Redirect all the allowed resquests to Portal. Otherwise to index.html


/**
 * Start Server
 */

var httpserver = http.createServer(app).listen(app.get("port"), function () {
  console.log("Starting " + config.get("name") + " web server");
  console.log("Express Http server listening on port " + app.get("port"));
});
httpserver.timeout = 600000;
// https.createServer(options, app).listen(3000, function() {
// // https.createServer(options, app).listen(443, function() {
//   console.log("https server listening on port 3000");
// });
var httpsserver = https.createServer(app).listen(config.get("httpsPort"), function () {
  // console.log(`https server listening on port`,config.get("httpsPort"));
  // console.log(appDir,"app directory");
});
httpsserver.timeout = 600000;
// https.createServer(options, app).listen(443, function() {
//   console.log("https server listening on port 443");
// });

// development error handler
// will print stacktrace

if (app.get("env") === "development") {
  //console.log(err);
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leacked to users
app.use(function (err, req, res, next) {
  // console.log(err);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:8000",
    "http://localhost:3000"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  let portalVersion = app.get("env") + config.get("version");
  res.setHeader("version", portalVersion);
  // console.log("Portal version: ", portalVersion);

  // Pass to next layer of middleware
  next();
});
