var cmdCtx = require.context('../src/commands', false, /^(?!(.*\/(index|git)\.js$)).*\.js/), api = {};
cmdCtx.keys().forEach(function (key) {
    console.log('key', key);
    api[key.replace(/.*\/(.*)\.js/, '$1')] = cmdCtx(key);
});

module.exports = api;