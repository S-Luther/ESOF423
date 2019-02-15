function updateEmail(email){
    var userId = firebase.auth().currentUser.uid;
    
    let userRef = firebase.database().ref('users/'+userId);
    
    userRef.update({'email':email});
}