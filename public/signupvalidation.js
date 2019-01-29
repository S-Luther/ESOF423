var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";

function formValidation() {
    var id = document.getElementById("uid").value;
    var uname = document.getElementById("un").value;
    var uemail = document.getElementById("ue").value;
    if(userid_validation(id,5,12)) {
        if(allLetter(uname)) {
            if(ValidateEmail(uemail)) {
                var content = {userID: id,name: uname,email: uemail};
                var myJSON = JSON.stringify(content);
                // console.log(myJSON);
                sendToDB(myJSON);
            } 
        }
    }
}
function userid_validation(id,mx,my) {
    var id_len = id.length;
    if (id_len == 0 || id_len >= my || id_len < mx) {
        alert("User Id should not be empty / length be between "+mx+" to "+my);
        id.focus();
        return false;
    }
    return true;
}
function allLetter(uname) {
    var letters = /^[A-Za-z]+$/;
    if(uname.match(letters)) {
        return true;
    }
    else {
        alert('Useruname must have alphabet characters only');
        uname.focus();
        return false;
    }
}
function ValidateEmail(uemail) {
    var mailformat = /\S+@\S+\.\S+/;
    if(uemail.match(mailformat)) {
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

function sendToDB(content) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // console.log(this.readyState);
        // console.log(this.status);
         if (this.readyState == 4 && this.status == 200) {
             alert("Sent");
         }else{

         }
    };
    xhttp.open("PUT", url.slice(0, url.length-5) + sendTo + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(content);
}
