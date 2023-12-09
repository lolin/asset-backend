var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const upload = require('./middleware/multer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var manufacturersRouter = require('./routes/manufacturers');
var categoriesRouter = require('./routes/categories');
var companyRouter = require('./routes/company');
var departmentRouter = require('./routes/departments');
var vendorRouter = require('./routes/vendors');
var conditionRouter = require('./routes/conditions');
var assetRouter = require('./routes/assets');
var remoteAccessRouter = require('./routes/remote-access');
var assetUserRouter = require('./routes/asset-user');
var assetAccountRouter = require('./routes/asset-account');
var depreciationRouter = require('./routes/depreciations');
var fieldSetRouter = require('./routes/fieldsets');
var customFieldRouter = require('./routes/custom-fields');
var assetModelRouter = require('./routes/asset-models');
var authRouter = require('./routes/auth');
const middlewareLogRequest = require('./middleware/log');
const authMiddleware = require('./middleware/accessValidation');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: '*',
}))
app.use(logger('dev'));
//middleware di bawah menginzinkan aplikasi untuk membaca request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//middleware untuk mengakses static file di dalam folder public, agar semua orang bisa akses
//dengan menggunakan routing /assets
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(middlewareLogRequest);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manufacturer', authMiddleware, manufacturersRouter);
app.use('/category', authMiddleware, categoriesRouter);
app.use('/company', authMiddleware, companyRouter);
app.use('/departments', authMiddleware, departmentRouter);
app.use('/vendors', authMiddleware, vendorRouter);
app.use('/conditions', authMiddleware, conditionRouter);
app.use('/assets', authMiddleware, assetRouter);
app.use('/depreciations', authMiddleware, depreciationRouter);
app.use('/field-sets', authMiddleware, fieldSetRouter);
app.use('/custom-fields', authMiddleware, customFieldRouter);
app.use('/asset-models', authMiddleware, assetModelRouter);
app.use('/remote-access', remoteAccessRouter);
app.use('/asset-user', assetUserRouter);
app.use('/asset-account', assetAccountRouter);
app.use('/auth', authRouter);


app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: "Upload success",
  });
})
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
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: err.message
  })
});

module.exports = app;
