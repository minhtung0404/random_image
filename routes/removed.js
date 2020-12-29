var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var path = require('path');
var router = express.Router();

var walkSync = require('../modules/walksync.js');
var addZero = require('../modules/addzero.js');

var { removed } = require('../config.json');

let removeds = [], html;

var check = function(dir, file){
    var path = dir + file;
    if (fs.statSync(path).isDirectory()) return false;
    if (isImage(path)) return true;
    return false;
};

walkSync(removed, removeds, check);

fs.readFile('./html/removed.html', 'utf8', (err, data) => {
    if (err) throw err;
    html = data;
});

fs.readFile('./html/notfound.html', 'utf8', (err, data) => {
    if (err) throw err;
    notfound = data;
});

router.get('/', function(req, res){
    if (removeds.length == 0) {
        res.write(notfound);
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * removeds.length);
    console.log()
    removed = html.replace(/\[nani\]/g, removeds[index]);
    res.write(removed);
    console.log('/removed (' + addZero(index + 1, removeds.length) + '/' + removeds.length + ') ' + removeds[index]);
    res.end();
});

module.exports = router;
