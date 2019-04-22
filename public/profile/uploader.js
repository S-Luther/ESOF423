
var url = "https://esof-423.firebaseio.com/documents/" + localStorage.getItem("id")+"/document.json"

var ref = firebase.database().ref().child('documents/' + localStorage.getItem("id"));

// Loop through to fill arr with names and print them to screen
ref.orderByChild("document").on("child_added", function(data) {
    displayFile(data.val().document);
})

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       alert(data.document);
//       displayFile(data.document);
//       //data

//         // data.forEach(function(element){
//         //     displayFile(element.document);
//         // });

//     })
// .catch(err => {
//   console.error('An error ocurred', err);
// })

const storageService = firebase.storage();
const storageRef = storageService.ref();

document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
    
    let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}


function displayFile(dl){
  document.getElementById("files").innerHTML = document.getElementById("files").innerHTML + "<img src=\"" + dl + "\" style=\"width:25%; height:auto;\">"

}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function handleFileUploadSubmit(e) {
  const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      displayFile(downloadURL)
      console.log('File available at', downloadURL);
      firebase.database().ref('documents/'+localStorage.getItem("id")+"/document").push({
        document: downloadURL
      });

      localStorage.getItem("id")
    });
     console.log('success');
     window.alert("success");

  });
}

// var UserD = "";
// function change(){
//   window.location.href = "profile/profile.html?id=" + UserD;

// }
//   /**
//    * Function called when clicking the Login/Logout button.
//    */
//   // [START buttoncallback]
//   function toggleSignIn() {
//     if (!firebase.auth().currentUser) {
//       // [START createprovider]
//       var provider = new firebase.auth.GoogleAuthProvider();
//       // [END createprovider]
//       // [START addscopes]
//       provider.addScope('https://www.googleapis.com/auth/plus.login');
//       // [END addscopes]
//       // [START signin]
//       firebase.auth().signInWithRedirect(provider);
//       // [END signin]
//     } else {
//       // [START signout]
//       firebase.auth().signOut();
//       window.location = 'index.html';
//       // [END signout]
//     }
//     // [START_EXCLUDE]
//     document.getElementById('quickstart-sign-in').disabled = true;
//     // [END_EXCLUDE]
//   }
//   // [END buttoncallback]


//   /**
//    *  writes user info to the database
//    *  called from within initApp funtion for when a user logs in
//    */
//    //TODO Make sure that the info isn't getting overwritten on each login

//   function writeUserData(userId, name, email, imageUrl) {
//     var fireUser = firebase.auth().currentUser;
//     if(!firebase.database().ref('users/' + userId)){
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl,
//       profile_type : "Patient",
//       age : "N/A",
//       gender : "N/A",
//       // date_created : fireUser.createdAt,
//       // last_signin : fireUser.lastSignedInAt,
//       phone : "phoneNumber"
//     });

//   }else{ 
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl,
//       profile_type : "Patient",
//       age : "N/A",
//       gender : "N/A",
//       // date_created : fireUser.createdAt,
//       // last_signin : fireUser.lastSignedInAt,
//       phone : "phoneNumber"
//     });
//   }
//   document.getElementById("theboi").disabled = false;
//   alert('Profile Created');

//     console.log(fireUser.createdAt)

//   }

//   /**
//    * initApp handles setting up UI event listeners and registering Firebase auth listeners:
//    *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
//    *    out, and that is where we update the UI.
//    *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
//    *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
//    */
//   function initApp() {
//     // Result from Redirect auth flow.
//     // [START getidptoken]
//     firebase.auth().getRedirectResult().then(function(result) {
//       if (result.credential) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // [START_EXCLUDE]
//         document.getElementById('quickstart-oauthtoken').textContent = token;
//       } else {
//         document.getElementById('quickstart-oauthtoken').textContent = 'null';
//         // [END_EXCLUDE]
//       }
//       // The signed-in user info.
//       var user = result.user;

//       // calls funtion to write to firebase
//       // this might need to be called from a different location if data is being overwritten
//       writeUserData(user.uid, user.displayName, user.email, user.photoURL);


//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // [START_EXCLUDE]
//       if (errorCode === 'auth/account-exists-with-different-credential') {
//         alert('You have already signed up with a different auth provider for that email.');
//         // If you are using multiple auth providers on your app you should handle linking
//         // the user's accounts here.
//       } else {
//         console.error(error);
//       }
//       // [END_EXCLUDE]
//     });
//     // [END getidptoken]


//     // Listening for auth state changes.
//     // [START authstatelistener]
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         UserD = user.uid;
//         // User is signed in.
//         writeUserData(user.uid, user.displayName, user.email, user.photoURL);

//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;


//         // [START_EXCLUDE]
//         document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//         document.getElementById('quickstart-sign-in').textContent = 'Sign out';
//         document.getElementById('quickstart-account-details').textContent = displayName;
//         // [END_EXCLUDE]

//       } else {
//         // User is signed out.
//         // [START_EXCLUDE]
//         document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//         document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
//         document.getElementById('quickstart-account-details').textContent = 'null';
//         document.getElementById('quickstart-oauthtoken').textContent = 'null';
//         // [END_EXCLUDE]
//       }
//       // [START_EXCLUDE]
//       document.getElementById('quickstart-sign-in').disabled = false;
//       // [END_EXCLUDE]
//     });
//     // [END authstatelistener]

//     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
//   }

//   window.onload = function() {
//     initApp();
//   };