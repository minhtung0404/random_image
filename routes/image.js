var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var path = require('path');
var router = express.Router();

var walkSync = require('../modules/walksync.js');
var addZero = require('../modules/addzero.js');

var { Path } = require('../config.json');

let images = [], html;

var check = function(dir, file){
    var path = dir + file;
    if (fs.statSync(path).isDirectory()) return false;
    if (isImage(path)) return true;
    return false;
};

Path.forEach(function(path){
    walkSync(path, images, check);
});

fs.readFile('./html/image.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

router.get('/', function(req, res){
    if (images.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * images.length);
    console.log()
    image = html.replace(/\[nani\]/g, images[index]);
    res.write(image);
    console.log('/image (' + addZero(index + 1, images.length) + '/' + images.length + ') ' + images[index]);
    res.end();
});

module.exports = router;
