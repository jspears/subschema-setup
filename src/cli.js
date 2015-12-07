"use strict";

var commands = require('./commands'), conf = {message: console.log}, api = require('./api');

function pad(val, size) {
    val = val || '';
    while (val.length < size) {
        val += ' ';
    }
    return val;
}

function helpLine(conf, short, long, describe) {
    short = short ? `-${short}` : short;
    conf.message(`\v\t${pad(short, 7)}\t--${pad(long, 10)}\t${describe}`)
}


function printHelp(conf, error) {
    conf.message(`Subschema Setup:\n running ${process.argv[1]}`);
    Object.keys(commands).forEach(function (key) {
        var cmd = commands[key];
        helpLine(conf, cmd.short, key, cmd.help);
    });
    helpLine(conf, 'a', 'all', 'Do everything');
    helpLine(conf, '', 'force', 'Overwrite without asking (dangerous)');
    helpLine(conf, 'h', 'help', 'This helpful message');
    if (error) {
        conf.message(`ERROR: ${error}`);
    }

}

function processArgs(conf, args) {
    conf.commands = conf.commands || [];
    if (!args || args.length === 0) args = ['-h'];
    for (var i = 0, l = args.length; i < l; i++) {
        CASE: switch (args[i]) {
            case '-a':
            case '--all':
                conf.commands = Object.keys(commands);
                return;
            case '-h':
            case '--help':
                printHelp(conf);
                process.exit(0);
            case '--force':
                conf.force = true;
                break CASE;
        }
    }

    conf.commands = args.map(function (arg) {
        var cmd = arg.replace(/^--?/, '');
        if (commands[cmd]) {
            return cmd;
        }
        cmd = Object.keys(commands).find(function (key) {
            if (commands[key] && '-' + commands[key].short == arg) {
                return key;
            }
        });
        if (!cmd) {
            throw new Error(`Invalid argument ${arg}`);
        }
        return cmd;
    });
}
if (require.main === module) {
    processArgs(conf, process.argv.slice(2));
    api.process(conf, function (e, o) {
        if (e) {
            console.log('stack:', e.stack);
            printHelp(conf, e);
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
