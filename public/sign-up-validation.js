var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";

function formValidation() {
    var id = document.registration.userId;
    var uname = document.registration.name;
    var uemail = document.registration.email;
    if(userid_validation(id,5,12)) {
            if(allLetter(uname)) {
                if(ValidateEmail(uemail)) {
                    var content = {userID: id,name: uname,email: uemail};
                    var myJSON = JSON.stringify(content);
                    sendToDB(myJSON);
                } 
            }
        }
    }
    return false;

}
function userid_validation(id,mx,my) {
    var id_len = id.value.length;
    if (id_len == 0 || id_len >= my || id_len < mx) {
        alert("User Id should not be empty / length be between "+mx+" to "+my);
        id.focus();
        return false;
    }
    return true;
}
function allLetter(uname) {
    var letters = /^[A-Za-z]+$/;
    if(uname.value.match(letters)) {
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
    if(uemail.value.match(mailformat)) {
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
         if (this.readyState == 4 && this.status == 200) {
             alert("Sent");
         }
    };
    xhttp.open("PUT", url.slice(0, url.length-5) + sendTo + ".json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(content);
}

