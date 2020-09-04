var fs = require('fs');
var express = require('express');
var app = express();

var { Path } = require('./config.json');
var imagejs = require('./routes/image.js');
var videojs = require('./routes/video.js');
var mangajs = require('./routes/manga.js');

app.use('/', express.static('/'));
app.use('/image', imagejs);
app.use('/video', videojs);
app.use('/manga', mangajs);

var html;

fs.readFile('./html/index.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

app.get('/', function(req, res){
    res.send(html);
    res.end();
});

app.listen(8080, '127.0.0.1', function(req, res){
    console.log("Listen on port 8080");
});
