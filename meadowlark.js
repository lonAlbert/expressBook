var fortune = require('./lib/fortune.js');

var express = require('express');

var app = express();
// set up handlebars view engine
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });

var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

app.engine('handlebars', handlebars.engine);

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT||3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about',function(req,res){
		res.render('about',{fortune:fortune.getFortune()});
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
res.status(404);
res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port')+'; press Ctrl-C to terminate');
});
