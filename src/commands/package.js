"use strict";
var util = require('../util');

var api = {
    exec: pkg,
    short: 'p',
    help: 'Setup package.json',
    schema: {
        schema: {
            'name': {
                type: 'Text',
                validators: ['required']
            },
            'version': {
                type: 'Text',
                validators: ['required']
            },
            'description': {
                type: 'TextArea'
            },
            repository: {
                type: 'Object',
                subSchema: {
                    type: {
                        type: 'Select',
                        options: ['git']
                    },
                    url: {
                        type: 'Text',
                        validators: ['required', 'url']
                    }
                }
            },
            keywords: {
                type: 'Text'
            },
            author: {
                type: 'Text'
            },
            licence: {
                type: 'Text'
            },
            dependencies: {
                keyType: 'Text',
                itemType: {type: 'Text', validators: ['semver']},
                type: 'Mixed'
            }
        },
        fields: ['name', 'version', 'description', 'repository', 'keywords', 'author', 'license']
    }
}
module.exports = api;

function pkg(conf, done) {
    console.log('\n\n\n\njere')
    done();
}