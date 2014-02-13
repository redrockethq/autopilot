'use strict';

var util = require('util'),
    _ = require('lodash'),
    _u = require('./utils');

exports = module.exports = Container;

/**
 * Scoped Container
 * @param [scoped]
 * @constructor
 */
function Container() {

}

var diagnostics = {};
/**
 * Dump out diagnostic information about the container
 * @returns {*}
 * @private
 */
var _dump = function () {

    var endOfLine = require('os').EOL;
    var header = endOfLine + endOfLine + "" + endOfLine +
        "CONTAINER" + endOfLine +
        "Diagnostics @ " + new Date() + "" + endOfLine +
        "" + endOfLine +
        "REGISTRATIONS" + endOfLine;
    console.log(header);
    console.log(util.inspect(Container.__, false, null, true));
};
Object.defineProperties(diagnostics, {
    dump: { enumerable: true, configurable: false, value: _dump  }
});

/**
 *
 * @param name
 * @param object
 * @private

 * @param {string} lifespan
 * @param {string} kind
 */
var _register = function (name, object, lifespan, kind) {
    var self = this;
    var prefix = "";
    var registry = object;
    var dependencies = [];
    lifespan = (lifespan || "new").toLowerCase();

    if (_.isFunction(registry)) {
        dependencies = _u.functions.getArgs(object);
        if (lifespan === "singleton") {
            prefix = "$$";
        }
        kind = (kind || 'factory').toLowerCase();
    } else {
        kind = (kind || 'value').toLowerCase();
    }

    var sanitizedName = prefix + _u.strings.sanitize(name);
    if (self.has(sanitizedName)) {
        throw new Error('There is already a registration for ' + name);
    }

    Container.__[sanitizedName] = {
        object: registry,
        lifespan: lifespan,
        dependencies: dependencies,
        kind: kind,
        instance: null
    };
};
var _remove = function (name) {
    var self = this;
    var regName = _resolveName(name);
    if (!regName) {
        throw new Error('There is no registration for ' + name);
    }

    delete Container.__[regName];
};
/**
 * Does the container have a registration
 * @param name
 * @returns {boolean}
 * @private
 */
var _has = function (name) {
    return _.has(Container.__, name);
};
/**
 * Get a registered object
 * @param {string} name
 * @param {object} [values]
 * @returns {object}
 * @private
 */
var _resolve = function (name, params) {
    params = params || {};

    var regName = _resolveName(name);
    var reg = null;
    if (regName) {
        reg = Container.__[regName];
        if (_.isFunction(reg.object)) {
            if (reg.lifespan === 'singleton') {
                if (!reg.instance) {
                    var singletonFn = _.bind(reg.object, {}, params);
                    if (reg.kind === 'ctor') {
                        reg.instance = new singletonFn();
                    } else {
                        reg.instance = singletonFn();
                    }
                }
                return reg.instance;
            } else {
                var fn = _.bind(reg.object, {}, params);
                if (reg.kind === 'ctor') {
                    return new fn();
                } else {
                    return fn();
                }
            }
        } else {
            return reg.object;
        }
    } else {
        return null;
    }
};
var _resolveName = function (name) {
    var sanitizedName = _u.strings.sanitize(name);
    if (_has(sanitizedName)) {
        return sanitizedName;
    } else {
        sanitizedName = '$$' + sanitizedName;
        if (_has(sanitizedName)) {
            return sanitizedName;
        }
    }
    return null;
};
var _can = function (name, params) {
    params = params || {};

//    var regName = _resolveName(name);
//    if (regName) {
//
//    }

    return true;
};

// Instance
Object.defineProperties(Container.prototype, {
    diagnostics: { enumerable: true, configurable: false, value: diagnostics },
    register: { enumerable: true, configurable: false, value: _register },
    remove: { enumerable: true, configurable: false, value: _remove },
    resolve: { enumerable: true, configurable: false, value: _resolve },
    has: { enumerable: true, configurable: false, value: _has},
    can: { enumerable: true, configurable: false, value: _can }
});

// Static
Object.defineProperties(Container, {
    __: {
        enumerable: false,
        configurable: false,
        value: {}
    }
});