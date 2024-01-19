var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
var remoteAccessRouter = require('./routes/remoteAccess');
var assetUserRouter = require('./routes/assetUser');
var assetAccountRouter = require('./routes/assetAccount');
var depreciationRouter = require('./routes/depreciations');
var fieldSetRouter = require('./routes/fieldsets');
var customFieldRouter = require('./routes/customFields');
var assetModelRouter = require('./routes/assetModels');
var assetTypeRouter = require('./routes/assetType');
var assetStatusRouter = require('./routes/assetStatus');
var authRouter = require('./routes/auth');
const middlewareLogRequest = require('./middleware/log');
const errorHandler = require('./middleware/errorHandler')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
  origin: '*',
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(middlewareLogRequest);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/manufacturers', manufacturersRouter);
app.use('/users', usersRouter);
app.use('/category', categoriesRouter);
app.use('/company', companyRouter);
app.use('/departments', departmentRouter);
app.use('/vendors', vendorRouter);
app.use('/conditions', conditionRouter);
app.use('/assets', assetRouter);
app.use('/depreciations', depreciationRouter);
app.use('/field-sets', fieldSetRouter);
app.use('/custom-fields', customFieldRouter);
app.use('/asset-models', assetModelRouter);
app.use('/asset-type', assetTypeRouter);
app.use('/asset-status', assetStatusRouter);
app.use('/remote-access', remoteAccessRouter);
app.use('/asset-user', assetUserRouter);
app.use('/asset-account', assetAccountRouter);
app.use(errorHandler);

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: "Upload success",
  });
})
// app.use(function (req, res, next) {
//   next(createError(404));
// });

module.exports = app;
