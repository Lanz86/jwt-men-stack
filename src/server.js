// modules
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import passport from 'passport';
import mongoose from 'mongoose';
import logger from 'morgan';
import db from './config/db'
import routes from './app/routes';
import passportConfig from './config/passport';

//configuration

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.getUrl()); 

//config files  

let app = express();

//set out port
var port = process.env.PORT || 3004;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
//app.use(passport.initialize());
app.use(logger('dev'));

// routes ==================================================
routes.factory(app);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});