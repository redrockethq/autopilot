"use strict";

var Container = require('./container');


function AutoPilot() {
  this.root = new Container();
}

Object.defineProperties(this, {
  root: {
    writable: true,
    enumerable: true,
    configurable: false
  }
});


module.exports = exports = new AutoPilot();