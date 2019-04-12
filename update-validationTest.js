var getRole = require('../getRole');
var expect = require('chai').expect;

//begin test
describe('#getRole()', function(){
    it('should return true', function(){
        expect(getRole(userRef)).to.equal(true);
    })
})
