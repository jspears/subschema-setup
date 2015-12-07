"use strict";
var util = require('../src/util'), expect = require('expect');

describe('util', function () {
    describe('chain', function () {
        it('many funcs', function () {
            var i = 1;

            function f() {
                return new Promise(function (r, e) {
                    i = i * 2;
                    setTimeout(r, 600 - (i * 100));
                });
            };
            return util.chain([f, f, f, f]).then(function () {
                expect(i).toBe(16);
            });
        });


        it('one one funcs', function () {
            var i = 1;

            function f() {
                return new Promise(function (r, e) {
                    i = i * 2;
                    setTimeout(r, 0);
                });
            };
            return util.chain([f]).then(function () {
                expect(i).toBe(2);
            });
        });
    });
});