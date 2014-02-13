'use strict';

/**
 * @const
 * @type {string}
 */
var singletonPrefix = '$$';

module.exports = {
    strings: {
        sanitize: function (name) {
            if (name && name.length > 0) {
                return name.trim(name).replace(/\s+/g, '-').toLowerCase();
            } else {
                return "";
            }

        }
    },
    functions: {
        // source: https://github.com/flitbit/minioc/blob/develop/lib/utils.js
        getArgs: function (fn) {
            var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
                STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            return fn.toString().replace(STRIP_COMMENTS, "").match(FN_ARGS)[1].split(',').filter(String);
        }
    },
    container: {
        lifespanPrefix: function (object, lifespan) {
            var prefix = '';
            lifespan = lifespan.toUpperCase();
            if (lifespan === 'SINGLETON') {
                prefix = "$$";
            }
            return prefix;
        }
    }
};