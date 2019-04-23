document.querySelector('.role-button').addEventListener('click', setRole);

function updateInfo(){
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    
    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('users/'+userId);
    
    if(email!=""&&validEmail(email)){
        updateEmail(userRef,email);
    }
    if(age!=""&&validAge(age)){
        updateAge(userRef,age);
    }
    if(gender!=""&&validGender(gender)){
        updateGender(userRef,gender);
    }
}

function validGender(gender){
    //The smallest bit of data sanitation
    if(gender.length<100){
        return true;
    }
    else{
        alert("Quite a large gender you got there");
        return false;
    }
}

function validAge(age){
    //Can't have a neg age
    if(age>=0){
        return true;
    }
    else{
        alert("Age cannot be less than 0")
        return false;
    }
}

function validEmail(email) {
    //Just making sure the email is in the form string@string.string
    var emailRegex = /\S+@\S+\.\S+/;
    if(email==null){
        return false;
    }
    if(emailRegex.test(email)) {
        return true;
    }
    else {
        alert('Email Format Error');
        return false;
    }
}

function updateEmail(userRef,email){
    userRef.update({'email':email}); 
    alert("Updated Email");
    resetForm();
}
function updateAge(userRef,age){
    userRef.update({'age':age}); 
    alert("Updated Age");
    resetForm();
}
function updateGender(userRef,gender){
    userRef.update({'gender':gender});
    alert("Updated Gender");
    resetForm(); 
}
function updateRole(userRef,role){
    userRef.update({'profile_type':role});
    alert("Updated Role");
}

function setRole(){
    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('users/'+userId);
    
    role = '';
    
    if (document.getElementById('doctor').checked){
        role = 'Doctor'
        updateRole(userRef,role);
    }
    else if(document.getElementById('patient').checked){
        role = 'Patient'
        updateRole(userRef,role);
    }
    else{
        alert("Please select a role");
    }
}

function resetForm(){
    document.getElementById("update-form").reset();
}

function change() {
    window.location.href = "profile/profile.html?id="+localStorage.getItem("id");
}