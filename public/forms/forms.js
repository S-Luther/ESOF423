
function change() {
    window.location.href = "../profile/profile.html?id=" + uid;
}

function newForm() {
  window.location.href = "basicInfoForm.html";
}

function allForms() {
  window.location.href = "formsLanding.html";
}

var userID;
var uid = localStorage.getItem("current_uid");

if (! uid) {
  console.log("Current User: " + userID);
  userID = "jasegased";
}

else {
  userID = uid;
  console.log("Current User: " + userID);
}

displayForm();

// Save a new recommendation to the database, using the input in the form
function submitForm() {

  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var bday = document.getElementById("birthDate").value;
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;
  var email = document.getElementById("email").value;
  var reason = document.getElementById("reason").value;
  var allergies = document.getElementById("allergies").value;
  var checkboxOne = document.getElementById("checkboxOne").value;
  var illness = document.getElementById("illness").value;
  var operations = document.getElementById("operations").value;
  var medications = document.getElementById("medications").value;
  console.log(fname);
  console.log(checkboxOne);

  firebase.database().ref('documents/forms/' + userID).set({
     firstName : fname,
     lastName : lname,
     bithDay : bday,
     height: height,
     weight: weight,
     email: email,
     reason: reason,
     allergies: allergies,
     illness: illness,
     operations: operations,
     medications: medications
  });

  console.log(
    "sending info to firebase"
  )
}

function displayForm() {
  var formData;
  var ref = firebase.database().ref("/documents/forms/" + uid);

  ref.orderByValue().on("value", function(data) {

    //only writes to console. This would be the best way to display
     data.forEach(function(data) {
        console.log(data.key + ": " + data.val());
     });

     //creates a snapshot of the whole form and turns it to a string... Kinda messy
     ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      formData = snapshot.val();
      var formDataJSON = JSON.stringify(formData, null, "    ");
      console.log(formDataJSON);
      document.getElementById('get-userinfo').textContent = formDataJSON;
     }, function (error) {
      console.log("Error: " + error.code);
      });
    });

  document.getElementById('get-userinfo').textContent = formData;

}
