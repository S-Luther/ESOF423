var user = localStorage.getItem("id");

/*
  keeps an up to date reference of the current userID and stores in on
  localStorage. Use localStorage.getItem("current_uid") to retrieve.
*/

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        UserD = user.uid;
        localStorage.setItem("current_uid", user.uid);

        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        console.log(displayName + " is logged in.");
    }
    else {
      console.log("No one is signed in");
    }
});
