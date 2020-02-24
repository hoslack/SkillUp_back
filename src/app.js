import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import expressValidator from 'express-validator';
import express from 'express';
import modules from './modules';

const app = express();

// view engine setup

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

modules(app);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
