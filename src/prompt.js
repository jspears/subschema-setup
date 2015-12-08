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
function makeMenu() {
    var menu = createMenu();
    menu.add('stuff', '*', function () {
        console.log('hello', arguments);
        menu.close();
        makeMenu();
    });
   // menu.close();
}
makeMenu();