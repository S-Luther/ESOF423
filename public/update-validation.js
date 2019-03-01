var config = {
  apiKey: "AIzaSyDDsSMQ5fz__zVROPs58rqVnFlkcu15PF8",
  authDomain: "esof-423.firebaseapp.com",
  databaseURL: "https://esof-423.firebaseio.com",
  projectId: "esof-423",
  storageBucket: "esof-423.appspot.com",
  messagingSenderId: "991614948455"
};

firebase.initializeApp(config);

document.querySelector('.role-button').addEventListener('click', setRole);

function setRole(){
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database();
    
    let userRef = database.ref('users/'+userId);
    
    role = 'Patient';
    
    if (document.getElementById('doctor').checked){
        role = 'Doctor'
    }
    userRef.update({'profile_type':role})
}

function updateEmail(){
    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('users/'+userId);
        
    var email = document.getElementById("email").value;
    
    userRef.update({'email':email});
}
