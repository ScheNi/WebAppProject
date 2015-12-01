// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');

// configuration ===========================================
// init database
require('./app/models/Posts');
require('./app/models/Comments');
require('./app/models/Users');
require('./config/passport');
mongoose.connect('mongodb://localhost/news');

//routes
var index = require('./app/routes/index');
var posts = require('./app/routes/posts');
var auth  = require('./app/routes/auth');

// view engine setup
app.set('views', path.join(__dirname, './public/dist'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(passport.initialize());
app.use('/', index);
app.use('/', posts);
app.use('/auth/', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('Error handling, error: ', err);

        res.status(err.status || 500);
        res.json({
            message: err.message,
            code: err.code,
            status: err.status
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        code: err.code,
        status: err.status
    });
});

//set serversport
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
