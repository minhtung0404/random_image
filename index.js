var http = require('http');
var fs = require('fs');
var isImage = require('is-image');
var express = require('express');
var app = express();

app.use('/', express.static('/'));

let Data, images = [];
let Path = [
]; // paths of folders containing images

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            walkSync(dir + file + '/', filelist);
        }
        else {
            if (isImage(file)) filelist.push(dir + file);
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

let index = 0;

app.get('/', function(req, res){
    console.log(images.length);
    if (images.length == 0) {
        res.write("Cannot find any images");
        res.end();
        return;
    }
    let index = Math.floor(Math.random() * images.length);
    console.log(images[index]);
    image = Data.replace(/\[nani\]/g, images[index]);
    res.write(image);
    res.end();
});

app.listen(8080, function(req, res){
    console.log("Listen on port 8080");
});
