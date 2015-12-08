var semver = require('semver');

module.exports = function (options) {
    options = options || {};
    if (!options.message) {
        options.message = 'Invalid Semantic Version';
    }
    return function (value) {
        if (semver.valid(value) == null) {
            return {
                message: options.message,
                type: 'ERROR'
            }
        }
        return;
    }
}