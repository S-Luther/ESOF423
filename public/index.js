var url = "https://esof-423.firebaseio.com/.json";
var sendTo = "";
var content = "{\"userID\":\"valueascsadasd\",\"name\":\"value\",\"email\":\"value@asdasd.asd\"}";
function update() {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("text").innerHTML = data;
        })
        .catch(err => {
            console.error('An error ocurred', err);
        })

}

function sendToDB() {
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

<<<<<<< HEAD
//update();
=======
update();
>>>>>>> dev
//sendToDB();
