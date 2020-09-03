var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var walkSync = require('../modules/walksync.js');
var addZero = require('../modules/addzero.js');

var { Path } = require('../config.json');

let videos = [];

var check = function(dir, file){
    var Path = dir + file;
    if (fs.statSync(Path).isDirectory()) return false;
    if (path.extname(Path) === '.mp4') return true;
    return false;
};

Path.forEach(function(path){
    walkSync(path, videos, check);
});

fs.readFile('./html/video.html', 'utf8', (err, data) => {
    if (err) throw err;
    videoHTML = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

router.get('/', function(req, res){
    if (videos.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * videos.length);
    console.log()
    video = videoHTML.replace(/\[nani\]/g, videos[index]);
    res.write(video);
    console.log('/video (' + addZero(index + 1, videos.length) + '/' + videos.length + ') ' + videos[index]);
    res.end();
});

module.exports = router;
