var assert = require('assert');
var findit = require('findit');
var Hash = require('hashish');

exports.cycle = function () {
    var find = findit.find(__dirname + '/cycle');
    var found = { directory : [], link : [], file : [] };
    
    find.on('directory', function (dir, stat) {
        found.directory.push(dir);
    });
    
    find.on('link', function () {
        found.link.push(dir);
    });
    
    find.on('file', function (file) {
        found.file.push(dir);
    });
    
    var to = setTimeout(function () {
        assert.fail('never ended');
    }, 5000);
    
    find.on('end', function () {
        clearTimeout(to);
        var dirs = Hash.map({
            directory : [ 'meep', 'meep/moop' ],
            link : [ 'meep/moop' ],
            file : []
        }, function (x) {
            return x.map(function (dir) {
                return __dirname + '/cycle/' + dir
            })
        });
        
        assert.deepEqual(dirs.directory, found.directory);
    });
};
