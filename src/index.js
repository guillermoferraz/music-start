const express = require ('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const {uuid} = require('uuidv4');
const multer = require('multer');
const methodOverride = require('method-override');

//Initialization
const app = express();

require('./database');
require('./config/passport');
//settings
app.set('port', process.env.PORT || 3000);


app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');



//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret:'MusicStart',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/avatar'),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  }
});
app.use(multer({
  storage: storage,
}).single('image'));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers','Content-Type');

  next();
})

//global variables

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.email = req.email || null;

  next();
})


//Routes

app.use(require('./routes'));
app.use(require('./routes/radios'));
app.use(require('./routes/videos'));
app.use(require('./routes/avatar'));


//Public
app.use(express.static(path.join(__dirname, 'public')));


//Start server
app.listen(app.get('port'), () => {
  console.log('Server start on port ', app.get('port'));
});
