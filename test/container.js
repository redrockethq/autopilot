"use strict";

var _ = require('lodash');


function Container() {}

var registry = {};
Object.defineProperties(Container.prototype, {

  registrations: {
    get: function () {
      return registry;
    },
    enumerable: true,
    configurable: false
  },

  register: {
    value: function (name, kind, obj) {
      if (name || name.length == 0)
        throw new Error('Name is required');
      name = name.toLowerCase();

      registry[name] = {
        kind: kind,
        value: obj
      };
    },
    enumerable: true,
    configurable: false
  },

  has: {
    value: function (name) {
      if (name || name.length == 0)
        throw new Error('Name is required');
      return _.has(registry, name);

    },
    enumerable: true,
    configurable: false
  },

  get: {
    value: function (name) {
      var self = this;
      if (!self.has(name))
        throw new Error('Registration not found with key: ' + name);
      else
        return registry[name];
    },
    enumerable: true,
    configurable: false
  },

  remove: {
    value: function (name) {
      var self = this;
      if (!self.has(name))
        throw new Error('Registration not found with key: ' + name);
      else
        delete registry[name];
    },
    enumerable: true,
    configurable: false
  },

  clear: {
    value: function () {
      registry = {};
    },
    enumerable: true,
    configurable: false
  }
});

module.exports = Container;