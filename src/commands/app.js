"use strict";
var util = require('../util');

var api = {
    exec: app,
    short: 'A',
    help: 'Setup a Simple App',
    deps: ['react', 'subschema'],
    post: ['package'],
    schema: {
        schema: {
            'name': {
                type: 'Text',
                validators: ['required', 'jsidentity']
            }
        }
    }
}
module.exports = api;

function app(conf, done) {
    console.log('app');
    done();
}