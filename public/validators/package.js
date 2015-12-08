var validate = require("validate-npm-package-name")
module.exports = function (options) {
    options = options || {};
    if (!options.message) {
        options.message = "Invalid Package Name"
    }
    if (!options.validType) {
        options.validType = 'validForNewPackages'
    }
    return function package_name$validator(value) {
        if (!validate(value)[options.validType]) {
            return {
                message: options.message
            }
        }
    }
}