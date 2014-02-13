'use strict';

var Container = require('./container');

exports = module.exports = new AutoPilot();

/**
 * AutoPilot IoC
 * @constructor
 */
function AutoPilot() {
    AutoPilot.root = new Container();
}

Object.defineProperties(AutoPilot.prototype, {
    VERSION: {
        enumerable: true,
        configurable: false,
        value: require('../package.json').version
    },
    container: { enumerable: true, configurable: false, value: AutoPilot.root }
});

Object.defineProperties(AutoPilot, {
    root: {
        enumerable: false,
        configurable: false,
        value: {}
    }
});
