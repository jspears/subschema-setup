"use strict";
var util = require('../util');
var defaults = require('lodash/object/defaults');
var licenses = ["SEE LICENSE IN <LICENSE>"].concat(require('spdx-license-ids/spdx-license-ids.json'));

var api = {
    exec: pkg,
    short: 'p',
    help: 'Setup package.json',

    schema: {
        schema: {
            'name': {
                type: 'Text',
                validators: ['required', 'package'],
                help: "The name is what your thing is called."
            },
            private: {
                type: 'Checkbox',
                help: 'Is this package private?'
            },
            'version': {
                type: 'Text',
                validators: ['required', 'semver'],
                help: " Version must be parseable by node-semver."
            },
            'description': {
                type: 'Markdown',
                help: "Put a description in it.  It's a string.  This helps people discover your package, as it's listed in npm search."
            },
            repository: {
                type: 'Object',
                help: 'Specify the place where your code lives.',
                subSchema: {
                    type: {
                        type: 'Select',
                        help: 'Repository type',
                        options: ['git', 'svn', 'mercurial', 'bitbucket', 'gist', 'npm/npm']
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
                help: "Put keywords in it. This helps people discover your package as it's listed in npm search."
            },
            author: {
                type: 'Object',
                title: 'Author',
                subSchema: {
                    name: "Text",
                    email: "Text",
                    url: "Text"
                }
            },
            contributors: {
                type: 'List',
                help: "A list of people who have contributed",
                itemType: {
                    name: "Text",
                    email: "Text",
                    url: "Text"
                }
            },

            license: {
                type: 'Autocomplete',
                options: licenses,
                help: 'The license to use'
            },
            dependencies: {
                keyType: {type: 'Text', title: ' Name'},
                canAdd: true,
                canDelete: true,
                valueType: {type: 'Text', title: 'Version', validators: ['semver']},
                type: 'Mixed',
                help: 'Extra dependencies'
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