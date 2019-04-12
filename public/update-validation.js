document.querySelector('.role-button').addEventListener('click', setRole);

function getRole(userRef){
    
    return true;
}

function setRole(){
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database();
    
    let userRef = database.ref('users/'+userId);
    
    role = 'Patient';
    
    if (document.getElementById('doctor').checked){
        role = 'Doctor'
    }
    userRef.update({'role':role})
}

function updateEmail(){
    var userId = firebase.auth().currentUser.uid;
    let userRef = firebase.database().ref('users/'+userId);
    
    var emailRegex = /\S+@\S+\.\S+/;
    
    var email = document.getElementById("email").value;
    
    if(emailRegex.test(email)) {
        userRef.update({'email':email});
    }
    else {
        alert('Email Format Error');
    }
    
}