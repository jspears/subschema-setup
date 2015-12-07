"use strict";
var util = require('../util');

var api = {
    exec: demo,
    short: 'd',
    help: 'Setup as Github Pages demo',
    pre: ['app'],
    post: ['package'],
    schema: {
        schema: {
            host: {
                type: 'Text',
                validators: ['required']
            }
        }
    }
};

module.exports = api;

function demo(conf, done) {

    done();
}