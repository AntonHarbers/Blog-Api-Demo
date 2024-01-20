var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var authRouter = require('./routes/auth_router');
var userRouter = require('./routes/user_router');
var commentRouter = require('./routes/comments_router');
var postRouter = require('./routes/post_router');

var helmet = require('helmet');
var compression = require('compression');
var RateLimit = require('express-rate-limit');

require('dotenv').config();

var app = express();

// Rate Limiting
const limiter = RateLimit({
  windowsMs: 1 * 60 * 1000, // 1 minute
  max: 240,
});

//mongoose setup
mongoose.set('strictQuery', false);
const mongoDB = process.env.MOGNO_URL_DEV;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.set('trust proxy', 1);

// Middleware chain
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  })
);
app.use(compression());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
