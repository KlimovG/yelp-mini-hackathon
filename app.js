const createError = require('http-errors');
const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');


const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const restaurantsRouter = require('./routes/restaurants');
const restaurantsListRouter = require('./routes/restaurants-list');
const tagsListRouter = require('./routes/tags-list');
const citiesListRouter = require('./routes/cities-list');
const commentsListRouter = require('./routes/comments-list');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/restaurants', restaurantsRouter);
app.use('/restaurants-list', restaurantsListRouter);
app.use('/tags-list', tagsListRouter);
app.use('/cities-list', citiesListRouter);
app.use('/comments-list', commentsListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendStatus(404)
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
