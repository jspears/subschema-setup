"use strict";
var util = require('../util');

var api = {
    exec: hot,
    short: 'o',
    help: 'Setup Hot Loading',
    deps: ['react-hot-loader'],
    pre: ['app'],
    post: ['package']
}

module.exports = api;

function hot(conf, done) {

    done();
}