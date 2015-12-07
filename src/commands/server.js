"use strict";
var util = require('../util');

var api = {
    exec: server,
    short: 's',
    help: 'Setup a Simple Isomorphic Server',
    deps: ['body-parser', 'express', 'query-parser'],
    pre: ['app'],
    post: ['package'],
    schema: {
        schema: {
            'name': {
                type: 'Number',
                dataType: 'integer',
                help: 'Port to run on',
                validators: ['required', 'port']
            },
            route: {
                type: 'Text',
                help: 'Route to listen to',
                validators: ['required']
            }
        },
        fields: 'name, route'
    }
}
module.exports = api;

function server(conf, done) {

    done();
}