var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";


var database = firebase.database();


function sendToDB(content) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert("Sent");
         }
    };
    xhttp.open("PUT", url.slice(0, url.length-5) + sendTo + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(content);
}


/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
// [END basic_write]
