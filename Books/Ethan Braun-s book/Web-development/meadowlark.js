var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next){
res.locals.showTests = app.get('env') !== 'production' &&
req.query.test === '1';
next();
});

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
res.render('home');
});
//маршрут для страницы О...
app.get('/about', function(req, res) {
 //Перенос в отдельный модуль  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
res.render('about', { fortune: randomFortune });
});
// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
res.status(404);
res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500');
});

// var fortunes = [
// "Победи свои страхи, или они победят тебя.",
// "Рекам нужны истоки.",
// "Не бойся неведомого.",
// "Тебя ждет приятный сюрприз.",
// "Будь проще везде, где только можно.",
// ];

// app.get('/', function(req, res){
//   res.type('text/plain');
//   res.send('Meadowlark Travel');
// });
// app.get('/about', function(req, res){
//   res.type('text/plain');
//   res.send('О Meadowlark Travel');
// });
//
// app.use(function(req, res){
//   res.type('text/plain');
//   res.status(404);
//   res.send('404 - not found');
// });
//
// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Ser Error');
// });
app.listen(app.get('port'), function(){

  console.log( 'Express запущен на http://localhost:' + app.get('port') + ': нажмите Ctrl+C для завершения.');
});
