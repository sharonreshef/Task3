var express = require('./node_modules/express');
var path = require('path');
var cookieParser = require('./node_modules/cookie-parser');
var logger = require('./node_modules/morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hostingRouter = require('./routes/hosting');
var serversRouter = require('./routes/servers');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hosting', hostingRouter);
app.use('/servers', serversRouter);

module.exports = app;
