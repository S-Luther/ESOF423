var config = {
  apiKey: "AIzaSyDDsSMQ5fz__zVROPs58rqVnFlkcu15PF8",
  authDomain: "esof-423.firebaseapp.com",
  databaseURL: "https://esof-423.firebaseio.com",
  projectId: "esof-423",
  storageBucket: "esof-423.appspot.com",
  messagingSenderId: "991614948455"
};
firebase.initializeApp(config);

displayAll();

function displayAll(){
    var display = document.getElementById("content");
    var ref = firebase.database().ref().child('users');
    
    //Clear content
    display.innerHTML = " ";
    
    // List users underneath search bar
    ref.orderByChild("username").on("child_added", function(data) {
        output = "";
        
        output += "<div class='users'>";
        output += "<p class='username'>" + data.val().username + "</p>"
        output += "</div>";
        
        display.innerHTML = display.innerHTML + output;
    })
}

function search(){
    var display = document.getElementById("content");
    var ref = firebase.database().ref().child('users');
    
    //Clear content
    display.innerHTML = " ";
    
    var input = document.getElementById("search-input").value;
    ref.orderByChild("username").equalTo(input).on("child_added", function(data) {
        output = "";
        
        output += "<div class='users'>";
        output += "<p class='user-info'>" + data.val().username + "</p>"
        output += "<p>" + data.val().email + "</p>"
        output += "</div>";
        
        display.innerHTML = display.innerHTML + output;
    });
}