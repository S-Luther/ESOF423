var counter = 0;

displayRequests();

function displayRequests(){
    var display = document.getElementById("recentReq");
    //var currentUser = firebase.auth().currentUser.uid;
    var userId = "PUJRmoguPDZ18AhGZy05vpM5gJM2";
    var ref = firebase.database().ref().child('users/'+userId+"/friend_req");

    // Get the most recent request
    ref.on("value", function(data) {
        var requests = data.val();
        console.log("Req"+counter+" : "+requests.req0);

        var reqRef = firebase.database().ref().child('users/'+requests.req0);

        var output = "";
        var user_name = "";

        reqRef.on('value', function(snapshot) {
            user_name += snapshot.val().username;
            console.log(user_name);

            output += "<p>"+user_name+"</p>";

            display.innerHTML = display.innerHTML + output;
        });

        counter += 1;
    })
}