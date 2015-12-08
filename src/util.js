"use strict";

var pslice = Array.prototype.slice,
    api = {
        chain,
        noNulls,
        loadJson,
        promisify,
        promise,
        toArray,
        pExec
    };

function toArray(val) {
    if (Array.isArray(val)) {
        return val;
    }
    if (val == null) {
        return [];
    }
    if (typeof val === 'string') {
        return val.split(/,\s+?/);
    }
    return [val];
}

function promisify(fn) {
    return function promisify$wrap() {
        var args = pslice.call(arguments), scope = this;
        return promise(function promise$executor(resolve, reject) {
            fn.apply(scope, args.concat(function (e, o) {
                if (e) {
                    return reject(e);
                }
                return resolve(o);
            }));
        });
    }
}

function promise(fn) {
    return new Promise(fn);
}
function reduceThen(cur, next) {
    return cur.then(next());
}

function chain(first, rest) {

    if (!Array.isArray(first)) {
        return chain([first].concat(rest));
    }
    if (first.length === 0) {
        return Promise.resolve();
    }
    return first.slice(1).reduce(reduceThen, first[0]());
}

function noNulls(val) {
    return !(val == null);
}
function pExec(cmd, options) {
    return promise((resolve, reject)=> {
       /* exec(cmd, options, function (err, stdout, stderr) {
            if (err) {
                return reject(stderr + '');
            }
            return resolve();
        });*/
        resolve();
    });
}
function loadJson(val, done) {
   /* fs.readFile(current('package.json'), {}, function (e, file) {
        if (e) {
            return done(e);
        }
        try {
            return done(null, JSON.parse(file));
        } catch (e) {
            return done(e);
        }
    });*/
    done();
}


module.exports = api;