var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var app = express();
var { Path } = require('./config.json');

app.use('/', express.static('/'));

let Data, images = [];

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            walkSync(dir + file + '/', filelist);
        }
        else {
            if (isImage(file)) {
                filelist.push(dir + file);
            }
        }
    });
};

Path.forEach(function(path){
    walkSync(path, images);
});

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) throw err;
    Data = data;
});

function addZero(index, length){
    length = length.toString().length;
    index = index.toString();
    while (index.length < length){
        index = '0' + index;
    }
    return index;
}

app.get('/', function(req, res){
    if (images.length == 0) {
        res.write("Cannot find any images");
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * images.length);
    image = Data.replace(/\[nani\]/g, images[index]);
    res.write(image);
    console.log('(' + addZero(index + 1, images.length) + '/' + images.length + ') ' + images[index])
    res.end();
});

app.listen(8080, '127.0.0.1', function(req, res){
    console.log("Listen on port 8080");
});
