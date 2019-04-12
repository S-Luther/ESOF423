var UserD = "";
function change() {
    window.location.href = "profile/profile.html?id=" + UserD;
}
/**
* Function called when clicking the Login/Logout button.
*/
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }
    else {
        firebase.auth().signOut();
        window.location = 'index.html';
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

/**
*  writes user info to the database
*  called from within initApp funtion for when a user logs in
*/

function writeUserData(userId, name, email, imageUrl) {
    var fireUser = firebase.auth().currentUser;
    if(!firebase.database().ref('users/' + userId)) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            id: userId,
            email: email,
            profile_picture : imageUrl,
            profile_type : "Patient",
            age : "N/A",
            gender : "N/A",
            phone : "phoneNumber"
        });
    }
    else { 
        firebase.database().ref('users/' + userId).set({
            username: name,
            id: userId,
            email: email,
            profile_picture : imageUrl,
            profile_type : "Patient",
            age : "N/A",
            gender : "N/A",
            phone : "phoneNumber"
        });
    }
    document.getElementById("theboi").disabled = false;

    console.log(fireUser.createdAt)
}

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
*    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
*/
function initApp() {
    firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        var token = result.credential.accessToken;
        document.getElementById('quickstart-oauthtoken').textContent = token;
    }
    else {
        document.getElementById('quickstart-oauthtoken').textContent = 'null';
    }
    var user = result.user;

    // calls funtion to write to firebase
    // this might need to be called from a different location if data is being overwritten
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        }
        else {
            console.error(error);
        }
    });

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            UserD = user.uid;
            // User is signed in.
            localStorage.setItem("id", user.uid);
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = displayName;

        }
        else {
            // User is signed out.
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            document.getElementById('quickstart-account-details').textContent = 'null';
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });

    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
    initApp();
};