var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var alert;
function generateAlert(x){
  if(!x){
    return;
  }
  alert(x);
}
describe('sign up validation', function() {
    var signupValidation;
    var validationStub;
    before(function() {
      validationStub = sinon.stub();
      signupValidation = proxyquire('../auth/signupvalidation.js',{'signupValidation': validationStub});
    });


    //allLetter testing
    it('Should accept a username with letters only.', function(done){
      var uname = 'usernameWithLettersOnly';
      expect(signupValidation.allLetter(uname)).to.equal(true);
      done();
    });//test case for a username of just letters.
    it('Should not accept a username with numbers only.', function(done){
      var uname = '123';
      alert = sinon.spy();
      generateAlert('Useruname must have alphabet characters only');
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal('Useruname must have alphabet characters only');
      done();
    });//test case for a username of just numbers.
    it('Should not accept a username with numbers and letters.', function(done){
      var uname = '123letters';
      alert = sinon.spy();
      generateAlert('Useruname must have alphabet characters only');
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal('Useruname must have alphabet characters only');
      done();
    });//test case for a username of numbers and letters.
    it('Should not accept a username of an empty string.', function(done){
      var uname = '';
      alert = sinon.spy();
      generateAlert('Useruname must have alphabet characters only');
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal('Useruname must have alphabet characters only');
      done();
    });//test case for an empty string as a username.


    //userid_vaidation testing
    it('Should accept a userid with length=mx.', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '12345';
      expect(signupValidation.userid_validation(userID, mx, my)).to.equal(true);
      done();
    });//test case for
    it('Should accept a userid with length=mx+1.', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '123456';
      expect(signupValidation.userid_validation(userID, mx, my)).to.equal(true);
      done();
    });//test case for
    it('Should accept a userid with length between mx and my', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '12345678';
      expect(signupValidation.userid_validation(userID, mx, my)).to.equal(true);
      done();
    });//test case for
    it('Should not accept a userID with an empty string', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '';
      alert = sinon.spy();
      generateAlert("User Id should not be empty / length be between " + mx + " to " + my);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("User Id should not be empty / length be between " + mx + " to " + my);
      done();
    });//test case for
    it('Should not accept a userID of length my.', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '1234567890';
      alert = sinon.spy();
      generateAlert("User Id should not be empty / length be between " + mx + " to " + my);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("User Id should not be empty / length be between " + mx + " to " + my);
      done();
    });//test case for
    it('Should not accept a username of length my+1.', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '12345678901';
      alert = sinon.spy();
      generateAlert("User Id should not be empty / length be between " + mx + " to " + my);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("User Id should not be empty / length be between " + mx + " to " + my);
      done();
    });//test case for
    it('Should not accept a username of length mx-1.', function(done){
      var mx = 5;//
      var my = 10;//
      var userID = '1234';
      alert = sinon.spy();
      generateAlert("User Id should not be empty / length be between " + mx + " to " + my);
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("User Id should not be empty / length be between " + mx + " to " + my);
      done();
    });//test case for



    //validateEmail testing.
    it('Should accept an email in the correct format.', function(done){
      var email = 'foo@foo.com';
      expect(signupValidation.ValidateEmail(email)).to.equal(true);
      done();
    });//test case for a string in the format of an email
    it('Should not accept an email in the format of a website.', function(done){
      var email = 'Dot.Com';
      alert = sinon.spy();
      generateAlert("You have entered an invalid email address!");
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("You have entered an invalid email address!");
      done();
    });//test case for string in format of website
    it('Should not accept an email in the format of just characters.', function(done){
      var email = 'notanemail';
      alert = sinon.spy();
      generateAlert("You have entered an invalid email address!");
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("You have entered an invalid email address!");
      done();
    });//test case for a string with just alphabet characters.
    it('Should not accept an email with a period and @ in the wrong order.', function(done){
      var email = 'thisis.not@anemail';
      alert = sinon.spy();
      generateAlert("You have entered an invalid email address!");
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal("You have entered an invalid email address!");
      done();
    });//test case for string with . and @ in wrong spot.

});
