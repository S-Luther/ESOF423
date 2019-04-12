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
    /*
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
    */
    var friendId = "H7T34fH7u2W6kJYWa4gpdEjNkEf2";
    var currentUser = "PUJRmoguPDZ18AhGZy05vpM5gJM2";
    
    var userRef = firebase.database().ref().child("users/"+friendId+"/friend_req");
    
    var newReq = userRef.push();
    var reqKey = newReq.key;
    
    newReq.set({
        req: currentUser,
        key: reqKey
    },function(error){
        if(error){
            alert("There was an error sending the friend request")
        }
        else{
            alert("Friend Request Sent");
        }
    });
}