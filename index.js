const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const logger = require('./middleware/logger');
const movies = require('./routes/movies');
const home = require('./routes/home');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to mongodb...'))
.catch((err) => console.log('Error connecting to mongodb.',err));

const app = express();
app.set('view engine', 'pug');
//app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('/api/movies', movies);
app.use('/', home);
app.use('/api/customers', customers);

// Configuration
//console.log("app name: "+config.get('name'));
//console.log("mail server: "+config.get('mail.host'));

// checks the environment, if dev, then morgan is enabled
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan is enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listerning to port ${port}`);
})