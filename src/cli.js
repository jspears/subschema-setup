"use strict";

var commands = require('./commands'),
    util = require('./util'),
    mapTo = util.mapTo,
    toArray = util.toArray,
    toFields = util.toFields,
    _set = require('lodash/object/set'),
    conf = {message: console.log}, api = require('./api');

function pad(val, size) {
    val = val || '';
    while (val.length < size) {
        val += ' ';
    }
    if (val.length > size) {
        val = val.substring(0, size - 3) + '...'
    }
    return val;
}

function helpLine(conf, short, long, describe) {
    short = short ? `-${short}` : short;
    conf.message(` ${pad(short, 19)}${pad('--'+long, 30)}${pad(describe, 200)}`)
}


function printHelp(conf, cmd, error) {
    conf.message(`Subschema Setup:\n running ${process.argv[1]}`);
    if (!cmd) {
        Object.keys(commands).forEach(function (key) {
            var cmd = commands[key];
            helpLine(conf, cmd.short, key, cmd.help);
        });
    } else {
        if (cmd) {
            var cmdObj = commands[cmd] || {};
            var schema = cmdObj.schema;
            conf.message(`Help for ${cmd}\n${cmdObj.help || ''}`);

            if (schema) {
                var ss = schema.schema;
                toFields(schema).forEach(function (c) {
                    var field = ss[c];
                    if (typeof field === 'string') {
                        field = {
                            type: field,
                            help: field
                        }
                    }
                    var help = field.help || field.type;
                    if (field.options) {
                        help += ' one of [' + (field.options.map(function (ret, key) {
                                ret += key.val || key;
                                return ret;

                            }).join(',')) + ']'
                    }
                    helpLine(conf, [cmdObj.short, c].join('.'), [cmd, c].join('.'), help);
                });
            }


        } else {
            helpLine(conf, 'a', 'all', 'Do everything');
            helpLine(conf, '', 'force', 'Overwrite without asking (dangerous)');
            helpLine(conf, 'h', 'help', 'This helpful message');
        }
        if (error) {
            conf.message(`ERROR: ${error}`);
        }

    }
}


function validate(conf, schema, values) {
    values = values || {};
    var errors;
    util.visitFields(schema.schema, function (field, f) {
        if (!field) return;
        var verrs = toArray(field.validators).map(function (validator) {
            var type;
            if (typeof validator === 'string') {
                //lookup val.type and init;
            } else if (typeof validator.type == 'string') {
                //lookup val.type and init;
            } else if (validator.type === 'function') {
                type = validator.type;
            }
            if (type) {
                return type(value, values);
            }
        }).filter(util.noNulls);

        if (verrs.length) {
            if (!errors) errors = {};
            errors[f] = verrs;
        }
    });

    return errors;

}


function processArgs(conf, args) {
    conf.commands = conf.commands || [];
    conf.config = {};
    if (!args || args.length === 0) args = ['-h'];
    for (var i = 0, l = args.length; i < l; i++) {
        CASE: switch (args[i]) {
            case '-a':
            case '--all':
                conf.commands = Object.keys(commands);
                return;
            case '-h':
            case '--help':
                printHelp(conf, args[i + 1]);
                process.exit(0);
            case '--force':
                conf.force = true;
                break CASE;
        }
    }

    conf.commands = args.map(function (arg) {
        var parts = /^-(-)?([^.]*)((?:\.)([^=].+?))?(?:=(.*))?$/.exec(arg);
        parts.shift();
        var isL = parts[0] != null;

        var c = parts[1];
        var key = parts[3];
        var val = parts[4];
        var cmd;
        if (isL) {
            if (commands[c]) {
                cmd = c;
            }

        } else {
            cmd = Object.keys(commands).find(function (key) {
                if (commands[key] && commands[key].short == c) {
                    return key;
                }
            });
        }
        if (!cmd) {
            throw new Error(`No such command ${arg}`);
        }
        if (key) {
            var cmdConf = conf.config[cmd] || (conf.config[cmd] = {});
            _set(cmdConf, key, val == null ? true : toPrimitive(val));
        }
        return cmd;

    });
}

function toPrimitive(val) {
    if (val == null || val === 'null') {
        return null;
    }
    if (/^-?\d+\.?\d*$/.test(val)) {
        return parseFloat(val, 10);
    }
    if (val === 'true' || val === 'false') {
        return val == 'true';
    }
    if (/,/.test(val)) {
        return toArray(val);
    }
    return val;
}

if (require.main === module) {
    api.commands = commands;
    processArgs(conf, process.argv.slice(2));
    console.log('confg', conf.config);
    api.process(conf, function (e, o) {
        if (e) {
            console.log('stack:', e.stack);
            printHelp(conf, null, e);
            process.exit(1);
            return;
        }
        console.log('all done');
        process.exit(0);

    })
} else {
    module.exports = {
        processArgs,
        printHelp,
        conf
    }
}
