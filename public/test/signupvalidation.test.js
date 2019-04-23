var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var actionStub = { };
var allLetter = proxyquire('../auth/signupvalidation',{allLetter: actionStub});
var userid_validation = proxyquire('../auth/signupvalidation',{userid_validation: actionStub});
var ValidateEmail = proxyquire('../auth/signupvalidation',{ValidateEmail: actionStub});
/*TODO:
  1.Figure out correct things for path stubs in proxyquire.
  2.Make sure tests run as expected.
*/

//begin test for allletter, the function that checks if a user's username contains only letters.
describe('#allLetter()', function(){
    var uname = "usernameWithLettersOnly";
    it('should accept username with all letters, and reject a username without all letters', function(){
        expect(allLetter(uname)).to.equal(true);//test case of just letters.
        uname="123";
        expect(allLetter(uname)).to.equal(false);//test case of just numbers.
        uname="123letters";
        expect(allLetter(uname)).to.equal(false);//test case of numbers and letters.
        uname="";
        expect(allLetter(uname)).to.equal(false);//test case of an empty username.
    });
});

//begin test for userid_validation, the function that checks if the userID is empty, and is between a specified range of lenghts.
describe('#userid_validation()', function(){
    var userID = "";
    var mx = 5;
    var my=10;
    it('should check if userID is empty, and between a set of lengths.', function(){
      expect(userid_validation(userID, mx,my)).to.equal(false);//test case for empty userID, should return false
      userID = "1234567890";
      expect(userid_validation(userID, mx, my)).to.equal(false);//test case for userID of length my, should return false
      userID = "12345678901";
      expect(userid_validation(userID, mx, my)).to.equal(false);//test case for userID of length my+1, should return false
      userID = "12345";
      expect(userid_validation(userID, mx, my)).to.equal(true);//test case for userID of length mx, should return true
      userID = "123456";
      expect(userid_validation(userID, mx, my)).to.equal(true);//test case for userID of length mx+1, should return true
      userID = "1234";
      expect(userid_validation(userID, mx, my)).to.equal(false);//test case for userID of length mx-1, should return false
      userID = "12345678";
      expect(userid_validation(userID, mx, my)).to.equal(true);//test case for userID in between mx and my. should return true
    });
});

//begin test for ValidateEmail, the function that validates whether the user has submitted an email address in the correct format.
describe('#ValidateEmail()', function(){
    it('should accept email in proper format(of "string@string.string"), reject email in improper format', function(){
        expect(ValidateEmail("email@thisishopefullynotarealwebsite.com")).to.equal(true);//test case of correct email format email@thisishopefullynotarealwebsite.com, which should return true
        expect(ValidateEmail("thisishopefullynotarealwebsite.com")).to.equal(false);//test case of thisishopefullynotarealwebsite.com, which should return false
        expect(ValidateEmail("thisishopefullynotarealwebsite")).to.equal(false);//test case of thisishopefullynotarealwebsite, which should return false
        expect(ValidateEmail("thisis.not@anemail")).to.equal(false);//test case of thisis.not@anemail, which should return false
    });
});
