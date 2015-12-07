"use strict";
var util = require('../util');

var api = {
    exec: project,
    short: 'P',
    help: 'Setup as a subschema project',
    deps: ['subschema'],
    post: ['package']
}
module.exports = api;

function project(conf, done) {

    done();
}