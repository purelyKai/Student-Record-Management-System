var express = require ('express');
var mysql = require('./dbson.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/statis',express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/employee', require('./employee.js'));