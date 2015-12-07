"use strict";
var util = require('../util');

var api = {
    exec: schema,
    short: 'S',
    help: 'Setup a Schema',
    schema: {
        schema: {
            name: {
                type: 'Text',
                help: 'The Name of your schema',
                validators: 'required'
            },
            schema: 'SchemaBuilder'
        },
        fields: 'name,schema'
    }
};

module.exports = api;

function schema(conf, done) {

    done();
}