
var config = {
  apiKey: "AIzaSyDDsSMQ5fz__zVROPs58rqVnFlkcu15PF8",
  authDomain: "esof-423.firebaseapp.com",
  databaseURL: "https://esof-423.firebaseio.com",
  projectId: "esof-423",
  storageBucket: "esof-423.appspot.com",
  messagingSenderId: "991614948455"
};

firebase.initializeApp(config);

document.querySelector('.role-button').addEventListener('click', setRoleTest);

function setRoleTest() {
  var userID = 'zSjdTDE9ZPefC9NmcvnYHzOI7U23';
  var database = firebase.database();
  let userRef = database.ref('users/'+userId);
  role = 'Doctor';
  userRef.update({'profile_type':role})
  console.log('setRole decides whether someone is a patient or a doctor');
  console.log('Expecting role variable that is currently' + userRef.profile_type + 'to be Doctor.' );
  if(userRef.profile_type == 'Doctor'){
    return console.log('Passed.');
  }else{
    console.log('Failed.');
  }
  role = 'Patient';
  userRef.update({'profile_type':role})
  console.log('Expecting role variable that is currently'+ userRef.profile_type + 'to be Patient.' )
  if(userRef.profile_type == 'Patient'){
    return console.log('Passed.');
  }else{
    console.log('Failed.');
  }
}


function updateEmailTest(){
    var userId = 'zSjdTDE9ZPefC9NmcvnYHzOI7U23';
    var userRef = firebase.database().ref('users/'+userId);

    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    var email = 'robotsdancing@gmail.com';
    console.log('updateEmail updates a users email address');
    console.log('Expecting input to match email formatting ');
    if(email.value.match(emailRegex)) {
      return console.log('Passed.');
    }else{
      console.log('Failed.');
    }
    email = 'notanemailaddress';
    console.log('expecting input to not match email format regular expression');
    if(!(email.value.match(emailRegex))){
      return console.log('Passed.');
    }else{
      console.log('Failed');
    }


}
setRoleTest();
updateEmailTest();
