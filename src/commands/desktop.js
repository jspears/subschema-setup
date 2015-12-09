"use strict";
var util = require('../util');

var api = {
    exec: desktop,
    short: 'E',
    help: 'Setup as an (Electron) desktop app',
    pre: ['app'],
    post: ['package'],
    description: `
# Desktop
Allows you to run your schema (app) in an executable.
With this you have access to more of the local machine,
however your customers will have to install it.

## Running
\`\`\`sh
 $ npm run desktop
\`\`\`
`
};

module.exports = api;

function desktop(conf, done) {

    done();
}