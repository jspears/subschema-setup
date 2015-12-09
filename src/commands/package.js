"use strict";
var util = require('../util');
var defaults = require('lodash/object/defaults');
var licenses = require('spdx-license-ids/spdx-license-ids.json')

var api = {
    exec: pkg,
    short: 'p',
    help: 'Setup package.json',

    schema: {
        schema: {
            'name': {
                type: 'Text',
                validators: ['required', 'package'],
                help: "The name of your npm package"
            },
            private: {
                type: 'Checkbox',
                help: 'Is this package private?'
            },
            'version': {
                type: 'Text',
                validators: ['required', 'semver'],
                help: "Initial version"
            },
            'description': {
                type: 'Markdown',
                help: "Describe your project"
            },
            repository: {
                type: 'Object',
                subSchema: {
                    type: {
                        type: 'Select',
                        help: 'Repository type',
                        options: ['git']
                    },
                    url: {
                        type: 'Text',
                        help: 'Url of repository',
                        validators: []
                    }
                }
            },
            keywords: {
                type: 'Text',
                help: "Keywords to help people find your project"
            },
            author: {
                type: 'Text',
                help: "Your name"
            },
            licence: {
                type: 'Autocomplete',
                options: licenses
            },
            dependencies: {
                keyType: {type: 'Text', title: ' Name'},
                canAdd: true,
                canDelete: true,
                valueType: {type: 'Text', title: 'Version', validators: ['semver']},
                type: 'Mixed'
            }
        },
        fields: ['name', 'private', 'version', 'description', 'repository', 'keywords', 'author', 'license', 'dependencies']
    }
}
module.exports = api;

function pkg(conf, done) {
    console.log('\n\n\n\njere')
    done();
}