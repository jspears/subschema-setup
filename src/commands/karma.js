"use strict";
var util = require('../util');

var api = {
    exec: karma,
    short: 'k',
    help: 'Setup Karma',
    deps: ["karma", "karma-dist", "karma", "karma-chrome-launcher", "karma-cli", "karma-firefox-launcher", "karma-mocha", "karma-sourcemap-loader", "karma-webpack"],
    pre: ["webpack"],
    post: ['package']
};

module.exports = api;

function karma(conf, done) {

    done();
}