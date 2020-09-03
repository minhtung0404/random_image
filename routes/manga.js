var fs = require('fs');
var path = require('path');
var isImage = require('is-image');
var express = require('express');
var router = express.Router();

var walkSync = require('../modules/walksync.js');
var addZero = require('../modules/addzero.js');

var { Path } = require('../config.json');

let files = [];

let page = '<img src="[nani]" class = "center-fit" /><br>\n'

var check = function(dir, file){
    var Path = dir + file;
    if (!fs.statSync(Path).isDirectory()) return false;
    if (file.slice(0, 5) === 'manga') return true;
    return false;
};

Path.forEach(function(path){
    walkSync(path, files, check);
});

fs.readFile('./html/manga.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

function getHTML(value){
    let images = [], Data = '';
    walkSync(value + '/', images, function(dir, file){
        var Path = dir + file;
        if (fs.statSync(Path).isDirectory()) return false;
        if (isImage(Path)) return true;
        return false;
    });

    images.forEach(function(manga_page){
        Data += page.replace(/\[nani\]/g, manga_page);
    });

    return html.replace(/\[Data\]/g, Data);
}

router.get('/', function(req, res){
    if (files.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * files.length);

    console.log();

    res.send(getHTML(files[index]));

    console.log('/manga (' + addZero(index + 1, files.length) + '/' + files.length + ') ' + files[index]);
});

module.exports = router;
