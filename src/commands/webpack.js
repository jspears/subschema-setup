"use strict";
var util = require('../util');

var api = {
    exec: webpack,
    short: 'w',
    help: 'Setup webpack',
    deps: ["babel-loader@5", "autoprefixer-loader", "css-loader", "json-loader",
        "less-loader", "postcss-loader", "raw-loader", "strip-loader", "style-loader", "text-loader", "url-loader"],
    post: ['package']
}

module.exports = api;

function webpack(conf, done) {

    done();
}