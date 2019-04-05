document.querySelector('.role-button').addEventListener('click', submitForm);

function submitForm(){
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database();

    let userRef = database.ref('documents/'+userId);

    document.getElementById('userInfo')

    userRef.update({'formSubmitted': "yes"})
}
