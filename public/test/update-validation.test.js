var expect = require('chai').expect;
var proxyquire = require('proxyquire');
var actionStub = { };
var validAge = proxyquire('../update-validation.js',{validAge: actionStub});
var validGender = proxyquire('../update-validation.js',{validGender: actionStub});
var validEmail = proxyquire('../update-validation.js',{validEmail: actionStub});
/*TODO:
  1.Figure out correct things for path stubs in proxyquire.
  2.Make sure tests run as expected.
*/

describe('#validAge()', function(){
    var age = 1;
    it('Should accept positive ages, reject ages <0.', function(){
        expect(validAge(age)).to.equal(true);//test case of a positive age that is small..
        age = -1;
        expect(validAge(age)).to.equal(false);//test case of a negative age.
        age = 150;
        expect(validAge(age)).to.equal(true);//test case of an age no one has verifiably gotten to.
        age = 0;
        expect(validAge(age)).to.equal(true);//test case of age 0.
    });
});

describe('#validGender()', function(){
    var gender = "This is a gender of just one hundred characters but first I need to type a lot and I mean a lot oof.";//100 char gender
    it('Should accept any string describing gender identity less than 100 char long', function(){
        expect(validGender(gender)).to.equal(false);//test case of a gender that is 100 char.
        gender ="This is a gender that is ninety nine characters long, well at least I hope I can get it that close.";
        expect(validGender(gender)).to.equal(true);//test case for a gender that is 99 char.
        gender ="This is is one hundred and one characters long, and coming up with long strings like this is not fun.";
        expect(validGender(gender)).to.equal(false);//test case for a gender that is 101 char.
        gender = "female";
        expect(validGender(gender)).to.equal(true);//test case for a short length gender.
        gender ="";//agender?
        expect(validGender(gender)).to.equal(true);//test case of patient not wanting to disclose their gender.
        gender ="what is gender even?";
        expect(validGender(gender)).to.equal(true);//should work, if anything the ? might cause issues.
        gender ="N/A";
        expect(validGender(gender)).to.equal(true);//this should work, if anything the / would cause problems?
    });
});


describe('#validEmail()', function(){
    var email = "validbuthopefullyunusedemailaddress@emailaddress.com";
    it('Should accept valid email, reject other strings.', function(){
        expect(validEmail(email)).to.equal(true);//test case of a string in the format of an email address.
        email = "invalidemailAddress@Nothingdotcom";
        expect(validEmail(email)).to.equal(false);//test case of a string with an @ but no period..
        email = "Dot.Com";
        expect(validEmail(email)).to.equal(false);//test case for just a website, no@ in front.
        email = "This.isnotanemail@notanemail";
        expect(validEmail(email)).to.equal(false);//Test case for a string with a . and an @ in the wrong order.
    });
});
