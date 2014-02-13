'use strict';

var expect = require('expect.js'),
    autopilot = require('../');


describe('AutoPilot', function () {

    beforeEach(function () {
        expect(autopilot).to.be.ok();
    });

    it('should have a version number', function () {
        var packageVersion = require('../package.json').version;
        expect(autopilot.VERSION).to.eql(packageVersion);
    });

    it('should have a root container', function () {
        expect(autopilot.container).to.be.ok();
    });

    describe('container', function () {
        describe('register', function () {
            it('should allow me to register', function () {
                autopilot.container.register('blah', { me: "object"});
                autopilot.container.register('func', function () {
                    this.output = "hello";
                    this.format = function (input) { return input.toUpperCase(); };
                }, 'singleton', 'ctor');

                autopilot.container.register('funcFactor', function (name) { return { message: name}; });
                var func = autopilot.container.resolve('func');
                console.log(func);
                console.log(func.format('blah'));
                var funcFactory = autopilot.container.resolve('funcFactor', {name: "bob"});
                console.log(funcFactory);
                autopilot.container.diagnostics.dump();
            });
        });
    });

});