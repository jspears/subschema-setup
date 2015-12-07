"use strict";
var fs = require('fs'), path = require('path');
var dirs = fs.readdirSync(path.dirname(module.filename)), api = {};

dirs.reduce(function (obj, f) {
    var name = f.replace(/\.jsx?$/, '');
    if (name === 'index') {
        return obj;
    }
    obj[name] = require('./' + f);
    return obj;
}, api)
module.exports = api;