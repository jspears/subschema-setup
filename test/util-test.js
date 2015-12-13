"use strict";
var util = require('../src/util'), expect = require('expect');

describe('util', function () {

    describe('toFields', function () {
        it('should return fields auto', function () {

            var fields = util.toFields({
                schema: {
                    test: 'Text',
                    stuff: {
                        'what': 'Text'
                    }
                }
            });
            expect(fields.indexOf('test') > -1).toBe(true, 'should have test');
            expect(fields.indexOf('stuff') > -1).toBe(true, 'should have what');
        });
        it('should return  fieldsets', function () {

            var fields = util.toFields({
                schema: {},
                fieldsets: {
                    fields: 'test',
                    fieldsets: {
                        fields: 'stuff'
                    }
                }
            });
            expect(fields.indexOf('test') > -1).toBe(true, 'should have test');
            expect(fields.indexOf('stuff') > -1).toBe(true, 'should have what');
        });
        it('should return  fields', function () {

            var fields = util.toFields({
                fields: 'test,stuff'
            });
            expect(fields.indexOf('test') > -1).toBe(true, 'should have test');
            expect(fields.indexOf('stuff') > -1).toBe(true, 'should have what');
        });

    });
    describe('visitFields', function () {
        it('should visit them', function () {
            var schema = {
                schema: {
                    stuff: 'stuff',
                    i1: 'i1',
                    more: {
                        subSchema: {
                            than: {
                                subSchema: {
                                    'that': 'more-than-that'
                                }
                            },

                            ignore: 'ignore'
                        },
                        //ignore these
                        fields: ['other', 'me']
                    },
                    other: {
                        subSchema: {
                            d1: 'other-d1',
                            d2: 'other-d2'
                        }
                    }
                },
                fields: ['stuff', 'more.than.that', 'other', 'dne']
            }, found = [];
            util.visitFields(schema, function (f) {
                found.push(f.type);
            });
            console.log('found', found);
            expect(found[0]).toBe('stuff', 'testing order')
            expect(found[1]).toBe('more-than-that', 'testing order')
            expect(found[2]).toBe('other-d1', 'testing order')
            expect(found[3]).toBe('other-d2', 'testing order')
            expect(found.length).toBe(4, 'found is the right length');
        })


    })
});