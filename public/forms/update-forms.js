
// initFirebase();
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

  // Get input values from each of the form elements


  // var bday = document.getElementById("birthDate");


  // Push a new recommendation to the database using those values
  // forms.push({
  //   firstName: fname,
  //   lastName: lname,
  //   // bday: bday
  // });
