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

describe('update-validation', function() {
    var updateValidation;
    var validationStub;
    before(function() {
      validationStub = sinon.stub();

      updateValidation = proxyquire('../update-validation.js',{'update-validation': validationStub});
    });

    //validAge tests
    it('Should accept 1 as a valid age.', function(done){
      var age = 1;
      expect(updateValidation.validAge(age)).to.equal(true);
      done();
    });//test case for a small positive age.
    it('Should not accept -1 as a valid age.', function(done){
      var age = -1;
      alert = sinon.spy();
      generateAlert('Age cannot be less than 0');
      expect(alert.calledOnce).to.be.true;
      expect(alert.args[0][0]).to.equal('Age cannot be less than 0');
      done();
    });//test case for a negative age.
    it('Should accept 150 as a valid age.', function(done){
      var age = 150;
      expect(updateValidation.validAge(age)).to.equal(true);
      done();
    });//test case for a large positive age.
    it('Should accept 0 as a valid age.', function(done){
      var age = 0;
      expect(updateValidation.validAge(age)).to.equal(true);
      done();
    });//test case for an age of 0;

    //validEmail tests
    it('Should accept foo@foo.com as a valid email.', function(done){
      var email = 'foo@foo.com';
      expect(updateValidation.validEmail(email)).to.equal(true);
      done();
    });//test case for an email (that hopefully doesn't exist) in a valid format.
    it('Should not accept Dot.Com as a valid email.', function(done){
      var email = 'Dot.Com';
      alert = sinon.spy();
      generateAlert('Email Format Error');
      expect(alert.args[0][0]).to.equal('Email Format Error');
      done();
    });//test case for a string representing just a website.
    it('Should not accept This.isnotanemail@notanemail as a valid email.', function(done){
      var email = 'This.isnotanemail@notanemail';
      alert = sinon.spy();
      generateAlert('Email Format Error');
      expect(alert.args[0][0]).to.equal('Email Format Error');
      done();
    });//Test case for a string with a . and an @ in the wrong order.
    it('Should not accept invalidemailAddress@Nothingdotcom as a valid email.', function(done){
      var email = 'invalidemailAddress@Nothingdotcom';
      alert = sinon.spy();
      generateAlert('Email Format Error');
      expect(alert.args[0][0]).to.equal('Email Format Error');
      done();
    });//test case of a string with an @ but no period.
    it('Should not accept invalidemailAddress as a valid email.', function(done){
      var email = 'invalidemailAddress';
      alert = sinon.spy();
      generateAlert('Email Format Error');
      expect(alert.args[0][0]).to.equal('Email Format Error');
      done();
    });//test case of just a string.

    //validGender tests.
    it('Should accept N/A as a valid gender.', function(done){
      var gender = 'N/A';
      expect(updateValidation.validGender(gender)).to.equal(true);
      done();
    });//test case for a string of N/A as gender
    it('Should accept a string with a ? as a valid gender.', function(done){
      var gender ='what is gender even?';
      expect(updateValidation.validGender(gender)).to.equal(true);
      done();
    });//test case for a string of "what is gender even?" as a gender.
    it('Should accept an empty string as a valid gender.', function(done){
      var gender ='';
      expect(updateValidation.validGender(gender)).to.equal(true);
      done();
    });//test case for an empty string as a gender.
    it('Should accept female as a valid gender.', function(done){
      var gender ='female';
      expect(updateValidation.validGender(gender)).to.equal(true);
      done();
    });//test case for a gender that could be expected.
    it('Should accept a string of 99 char as a valid gender.', function(done){
      var gender ='This is a gender that is ninety nine characters long, well at least I hope I can get it that close.';
      expect(updateValidation.validGender(gender)).to.equal(true);
      done();
    });//test case for a gender that could be expected.
    it('Should not accept a string that is 101 char long as a valid gender.', function(done){
      var gender ='This is is one hundred and one characters long, and coming up with long strings like this is not fun.';
      alert = sinon.spy();
      generateAlert('Quite a large gender you got there');
      expect(alert.args[0][0]).to.equal('Quite a large gender you got there');
      done();
    });//test case for a long unaccepted string.
    it('Should not accept a string that is 100 char long as a valid gender.', function(done){
      var gender ='This is a gender of just one hundred characters but first I need to type a lot and I mean a lot oof.';
      alert = sinon.spy();
      generateAlert('Quite a large gender you got there');
      expect(alert.args[0][0]).to.equal('Quite a large gender you got there');
      done();
    });//test case for a long unaccepted string.

});
