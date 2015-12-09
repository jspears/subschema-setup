"use strict";
var util = require('../util');

var api = {
    exec: mongo,
    short: 'M',
    help: 'Sets up mongo',
    post: ['server'],
    schema: {
        schema: {
            url: {
                type: 'Text',
                help: 'The mongodb url'
            }
        },
        fields: ['url']
    },
    description: `
## Allows for rest access to mongo
servers via the mongoose (ORM) and mers
rest libraries.

`
};

module.exports = api;

function mongo(conf, done) {

    done();
}