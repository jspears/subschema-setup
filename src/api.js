"use strict";

var bbq = require('bluebird'), util = require('./util'), toArray = util.toArray;


function process(conf, done) {
    var cmdMap = {};

    function handleCmd(cmd) {
        var cmdObj, pre = [], post = [], exe = cmd;
        if (typeof cmd === 'string') {
            cmdObj = api.commands[cmd], pre = toArray(cmdObj.pre), post = toArray(cmdObj.post), exe = cmdObj.exec;
            if (cmdMap[cmd]) {
                return cmdMap[cmd];
            }
        }
        if (typeof exe !== 'function') {
            console.log('not an exec command ', cmd);
            return done(new Error('wrut, whro not an a command? ' + cmd));
        }

        var ret = cmdMap[cmd] = bbq.map(pre, handleCmd).then(function () {
            conf.message(cmd, `Running ${cmd}`)
            return bbq.promisify(exe)(conf).then(function () {
                conf.message(cmd, `Success ${cmd}`);
            }, function () {
                conf.message(cmd, `Error ${cmd}`);
            });
        }).then(function () {
            return bbq.map(post, handleCmd)
        });
        return ret;
    }

    bbq.map(conf.commands, handleCmd).then(function () {
        done();
    }, done);


}
var api = {
    process
}

module.exports = api;