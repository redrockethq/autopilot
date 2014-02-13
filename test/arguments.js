'use strict';

var p = function (name, age) { },
    _ = require('lodash'),
    utils = require('../lib/utils'),
    expect = require('expect.js');

describe('Args', function () {
    it('should have 2 arguments', function () {
        expect(utils.functions.getArgs(p).length).to.eql(2);
        expect(utils.functions.getArgs(function () {}).length).to.eql(0);
    });
});