var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('i18n');
i18n.configure({
   locales: ['pl','en'],
   directory: path.join(__dirname,'locales'),
   objectNotation: true,
   cookie: 'acme-hr-lang'
});
app.use(i18n.init);

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});





var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const  classRouter = require('./routes/classRoute');
const  skillRouter = require('./routes/skillRoute');
const  classSkillRouter = require('./routes/classSkillRoute');
const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err=>{
        console.log(err);
    });

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/classes', classRouter);
app.use('/skills', skillRouter);
app.use('/classSkills', classSkillRouter);

const classApiRouter = require('./routes/api/ClassApiRoute');
app.use('/api/classes',classApiRouter);

const skillApiRouter = require('./routes/api/SkillApiRoute');
app.use('/api/skills',skillApiRouter);

const clasSkillApiRouter = require('./routes/api/ClassSkillApiRoute');
app.use('/api/classskills',clasSkillApiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
