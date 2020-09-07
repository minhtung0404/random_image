var fs = require('fs');
var path = require('path');

var walkSync = function(dir, files, check) {
    var fs = fs || require('fs'),
        filelist = fs.readdirSync(dir);

    files = files || [];

    filelist.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory() && !file.startsWith('manga')) {
            walkSync(dir + file + '/', files, check);
        }
        if (check(dir, file)) files.push(dir + file);
    });
};

module.exports = walkSync;
