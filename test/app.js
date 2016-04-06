var assert = require("assert");
var seed = require("../data/seedData")

describe('Initial data', function(){
    describe('The scenario', function(){
        it('should not be empty', function(){
            assert.ok(seed.initialApps);
        })
    })
});