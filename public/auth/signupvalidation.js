var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";

module.exports = {
  formValidation: function() {
    var id = document.getElementById("uid").value;
    var uname = document.getElementById("un").value;
    var uemail = document.getElementById("ue").value;
    if (userid_validation(id, 5, 12)) {
      if (allLetter(uname)) {
        if (ValidateEmail(uemail)) {
          var content = {
            userID: id,
            name: uname,
            email: uemail
          };
          var myJSON = JSON.stringify(content);
          // console.log(myJSON);
          sendToDB(myJSON);
        }
      }
    }
  },

  userid_validation: function(id, mx, my){
    var id_len = id.length;
    if (id_len == 0 || id_len >= my || id_len < mx) {
      alert("User Id should not be empty / length be between " + mx + " to " + my);
      id.focus();
      return false;
    }
    return true;
  },

  allLetter: function(uname){
    var letters = /^[A-Za-z]+$/;
    if (uname.match(letters)) {
      return true;
    } else {
      alert('Useruname must have alphabet characters only');
      uname.focus();
      return false;
    }
  },

  ValidateEmail: function(uemail){
    var mailformat = /\S+@\S+\.\S+/;
    if (uemail.match(mailformat)) {
      return true;
    } else {
      alert("You have entered an invalid email address!");
      uemail.focus();
      return false;
    }
  },

  sendToDB: function(content) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      // console.log(this.readyState);
      // console.log(this.status);
      if (this.readyState == 4 && this.status == 200) {
        alert("Sent");
        // window.location = 'user.html';
      } else {

      }
    };
    xhttp.open("PUT", url.slice(0, url.length - 5) + sendTo + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(content);
  }
}
document.getElementById("quickstart-sign-in").onclick = function() {
  window.location = "user.html";
};
