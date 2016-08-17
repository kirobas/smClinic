var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mustacheExpress = require('mustache-express');
var session = require('express-session');
var http = require('http');


var routes = require('./routes/index');

var satelize = require('satelize');
var clients = require(__dirname + '/inc/clients');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.engine('html', mustacheExpress());          // register file extension mustache
app.set('view engine', 'html');                 // register file extension for partials
app.set('views', path.join(__dirname, 'views'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('23msdzmflnlgnngngnhlnh'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '23msdzmflnlgnngngnhlnh',
  name: 'sid',
  cookie: {maxAge: 6000000},
  proxy: true,
  resave: true,
  saveUninitialized: true
}));


app.use('/', routes);

io.sockets.on('connection', function (socket) {
    clients.init(satelize,socket, function () {
        var client = clients.fetchClient(socket.id);
        socket.emit('client info', client);
        socket.on('message', function (msg) {
            console.log('Message recieved from ' + client.id);
            socket.emit('client info', client);
        });
        socket.on('disconnect', function () {
            clients.removeClient(client);
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

server.listen(3000, function(){
  console.log('listening on *:3000');
});
// app.listen(process.env.PORT || 3000, function () {
//   console.log('Example app listening on port ' + (process.env.PORT || 3000));
// });
