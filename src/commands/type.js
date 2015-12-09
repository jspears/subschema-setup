"use strict";
var util = require('../util');

var api = {
    exec: type,
    short: 'T',
    help: 'Setup a Simple Type',
    deps: ['git'],
    schema: {
        schema: {
            'name': {
                type: 'Text',
                help: 'Name of Type',
                validators: ['required', 'jsidentity']
            }
        }
    }
}
module.exports = api;

function type(conf, done) {

    done();
}