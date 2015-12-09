"use strict";
var util = require('../util');

var api = {
    exec: demo,
    short: 'd',
    help: 'Setup as Github Pages demo',
    pre: ['app'],
    post: ['package', 'git']
};

module.exports = api;

function demo(conf, done) {

    done();
}