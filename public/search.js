var config = {
  apiKey: "AIzaSyDDsSMQ5fz__zVROPs58rqVnFlkcu15PF8",
  authDomain: "esof-423.firebaseapp.com",
  databaseURL: "https://esof-423.firebaseio.com",
  projectId: "esof-423",
  storageBucket: "esof-423.appspot.com",
  messagingSenderId: "991614948455"
};
firebase.initializeApp(config);

var user_arr = [];
var counter = 0;

displayAll();

function displayAll(){
    var display = document.getElementById("content");
    var ref = firebase.database().ref().child('users');
    
    // Loop through to fill arr with names and print them to screen
    ref.orderByChild("username").on("child_added", function(data) {
        user_arr[counter] = data.val().username;
        
        output = "";
        
        output += "<div class='users'>";
        output += "<p class='username'>" + user_arr[counter] + "</p>"
        output += "</div>";
        
        display.innerHTML = display.innerHTML + output;
        
        counter += 1;
    })
}

function search(){
    var display = document.getElementById("content");
    var ref = firebase.database().ref().child('users');
    
    //Clear content
    display.innerHTML = " ";
    
    var input = document.getElementById("search-input").value;
    
    //Loop through and if the string they inputed matched any user name, display it
    var i;
    for (i = 0; i < user_arr.length; i++) {
        if (user_arr[i].toLowerCase().includes(input.toLowerCase())) {
            ref.orderByChild("username").equalTo(user_arr[i]).on("child_added", function(data) {
                output = "";

                output += "<div class='users'>";
                output += '<a class="user-info" href="profile/profile.html?id=' + data.val().id +'">'+data.val().username+'</a>'
                output += "<p class='user-info'>" + data.val().email + "</p>"
                output += "</div>";

                display.innerHTML = display.innerHTML + output;
            });
        }
    }
}