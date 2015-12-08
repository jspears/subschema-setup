var createMenu = require('simple-terminal-menu')
var read = require('read');
// Options for the menu when created through the factory
var factoryMenuOptions = {} // Can be empty! the factory uses some sensible defaults!
var commands = require('./commands');
// Defaults for creating menu with the factory
var defaultFactoryOptions = {
    title: "Subschema ",
    // you could also specify `subtitle:`, menu & extras are not available.
}
var factory = require('simple-terminal-menu/factory')(factoryMenuOptions, defaultFactoryOptions), conf = {
    commands: []
};
function subSchemaMenu(key, schema, conf) {
    var menu = createMenu();
    var fields = schema.fields || Object.keys(schema.schema), schema = schema.schema || {};
    menu.writeLine("Subschema > " + commands[key].help);
    menu.writeSeparator();
    fields.forEach(function (field) {
        var ref = schema[field] || {};

        menu.add(ref.title || field, '', function () {
            var menuStream = menu.createStream();

        });
    });
    /* read({
     prompt:'hello'
     }, function(){
     console.log('read hello', arguments);
     })*/
    menu.writeSeparator();

    menu.add("done", mainMenu);
    menu.add("cancel", mainMenu);
    menu.add("exit", menu.close);
}

function showSelection(key, conf, label, marker) {
    console.log("label: " + label + "; key: " + key + ";")
    if (commands[key].schema) {
        subSchemaMenu(key, commands[key].schema, conf);
    } else {
        conf.commands.push(key);
        mainMenu();
    }
}

function mainMenu() {
    var menu = createMenu({ // settings passed through to terminal-menu
        x: 3,
        y: 2
    })
    menu.writeLine("Subschema Setup Menu");
    menu.writeSeparator();
    Object.keys(commands).forEach(function (key, i) {
        var cmd = commands[key];
        menu.add(cmd.help, conf.commands.indexOf(key) > -1 ? "[selected]" : '', showSelection.bind(null, key, conf));
    });
    menu.writeSeparator()
    menu.add("install", menu.close)
    menu.add("exit", menu.close)
}

function subMenu() {
    var menu = createMenu()
    menu.writeLine("SubMenu")
    menu.writeSeparator()
    menu.add("C", "[selected]", showSelection)
    menu.add("D", showSelection)
    menu.writeSeparator()
    menu.add("cancel", mainMenu)
    menu.add("niceTitle", nicelyTitledMenu)
    menu.add("exit", menu.close)
}

function nicelyTitledMenu() {
    var menu = createMenu();
    menu.writeTitle("Awesome window")
    menu.writeSubtitle("A little more colorful")
    menu.writeSeperator()
    menu.add("cancel", subMenu)
    menu.add("factoryA", factoryMenuA)
    menu.add("exit", menu.close)
}


function factoryMenuA() {
    factory.create({
        subtitle: "factory-a",
        menu: [{
            label: "E",
            handler: showSelection
        }, {
            label: "F",
            handler: showSelection
        }],
        extras: [{
            label: "factoryB",
            handler: factoryMenuB
        }, {
            label: "cancel",
            handler: nicelyTitledMenu
        }]
    })
}

function factoryMenuB() {
    factory.create({
        subtitle: "factory-b",
        menu: [{
            label: "G",
            handler: showSelection
        }],
        extras: [{
            label: "factoryA",
            handler: factoryMenuA
        }, {
            label: "cancel",
            handler: nicelyTitledMenu
        }]
    });
}

mainMenu()