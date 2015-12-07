"use strict";
var util = require('../util');

var api = {
    exec: template,
    short: 'M',
    help: 'Setup a Simple Template',
    deps: ['git'],
    schema: {
        schema: {
            'name': {
                type: 'Text',
                help: 'Name of Template',
                validators: ['required']
            }
        }
    }
}
module.exports = api;

function template(conf, done) {

    done();
}