"use strict";
var util = require('../util'), pExec = util.pExec, chain = util.chain;
var api = {
    exec: git,
    short: 'g',
    help: 'Setup Git',
    post: ['package'],
    schema: {
        schema: {
            remotes: {
                type: 'Mixed',
                valueType: {
                    type: 'Object',
                    subSchema: {
                        url: {
                            type: 'Text',
                            title: 'Url',
                            validators: 'required'
                        },
                        tags: {
                            type: 'Checkbox',
                            title: "Tags",
                            "help": "--[no-]tags"
                        },
                        mirror: {
                            "type": "Select",
                            options: "fetch, push",
                            help: "--mirror=<fetch|push>"
                        },
                        track: {
                            "type": "Text",
                            "help": "track branch (-t)"
                        }
                    }
                }
            }
        },
        fields: 'remotes'
    }
};

module.exports = api;


function git(conf, done) {
    done();
    /*var oWriteFile = conf.api.writeFile;
    conf.api.writeFile = function (conf, filename, content, done) {
        oWriteFile.call(this, conf, filename, content, function (e, o) {
            if (e) {
                return done(e);
            }
            add(filename).then(done, done);
        });
    }

    util.chain(init(conf), Object.keys(conf.written).map(add)).then(done, done);*/
}

function add(filename) {
    return function () {
        return pExec(`git add ${filename}`);
    }
}

function cmd(exe, opts) {
    return pExec(exe, opts);
}
function init(conf) {
    return function () {
        return promise((resolve, reject)=> {
            if (util.isDir('.git')) {
                resolve();
            }
            var cmds = [cmd('git init')];
            if (conf.command.git.repo)
                cmds.push(
                    cmd('git `')
                )
            pExec('git init', {}).then(resolve, reject);
        });
    }
}

