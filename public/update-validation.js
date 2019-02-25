var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";

function formValidation() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var s = document.getElementById("state");
    var state = s.options[s.selectedIndex].text;
    var zip = document.getElementById("zip").value;
    var phone = document.getElementById("phone").value;
    
    if(nameFormat(name)) {
        if(addressFormat(address)) {
            if(cityFormat(city)) {
                var content = {name: name,address: address,city: city,state: state,zip: zip,phone: phone};
                sendTo = name;
                var myJSON = JSON.stringify(content);
                sendToDB(myJSON);
            }
        }
    }
}
function updateEmail(email){
    var userId = firebase.auth().currentUser.uid;
    
    let userRef = firebase.database().ref('users/'+userId);
    
    userRef.update({'email':email});
}
function nameFormat(name) {
    var letters = /^[A-Za-z]+$/;
    if(name.match(letters)) {
        return true;
    }
    else {
        alert('Name format error');
        name.focus();
        return false;
    }
}
function addressFormat(address) {
    var letters = /^[A-Za-z0-9'\.\-\s\,]+$/;
    if(address.match(letters)) {
        return true;
    }
    else {
        alert('Address format error');
        address.focus();
        return false;
    }
}
function cityFormat(city) {
    var letters = /^[A-Za-z]+$/;
    if(city.match(letters)) {
        return true;
    }
    else {
        alert('City format error');
        city.focus();
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
