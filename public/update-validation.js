//document.querySelector('.role-button').addEventListener('click', setRole);
module.exports = {
  updateInfo: function() {
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;

    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('users/' + userId);

    if (email != "" && validEmail(email)) {
      updateEmail(userRef, email);
    }
    if (age != "" && validAge(age)) {
      updateAge(userRef, age);
    }
    if (gender != "" && validGender(gender)) {
      updateGender(userRef, gender);
    }
  },

  validGender: function(gender) {
    //The smallest bit of data sanitation
    if (gender.length < 100) {
      return true;
    } else {
      alert("Quite a large gender you got there");
      return false;
    }
  },

  validAge: function(age) {
    //Can't have a neg age
    if (age >= 0) {
      return true;
    } else {
      alert("Age cannot be less than 0")
      return false;
    }
  },

  validEmail: function(email) {
    //Just making sure the email is in the form string@string.string
    var emailRegex = /\S+@\S+\.\S+/;
    if (email == null) {
      return false;
    }
    if (emailRegex.test(email)) {
      return true;
    } else {
      alert('Email Format Error');
      return false;
    }
  },

  updateEmail: function(userRef, email) {
    userRef.update({
      'email': email
    });
    alert("Updated Email");
    resetForm();
  },

  updateAge: function(userRef, age) {
    userRef.update({
      'age': age
    });
    alert("Updated Age");
    resetForm();
  },
  updateGender: function(userRef, gender) {
    userRef.update({
      'gender': gender
    });
    alert("Updated Gender");
    resetForm();
  },
  updateRole: function(userRef, role) {
    userRef.update({
      'profile_type': role
    });
    alert("Updated Role");
  },

  setRole: function() {
    var userId = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref('users/' + userId);

    role = '';

    if (document.getElementById('doctor').checked) {
      role = 'Doctor'
      updateRole(userRef, role);
    } else if (document.getElementById('patient').checked) {
      role = 'Patient'
      updateRole(userRef, role);
    } else {
      alert("Please select a role");
    }
  },

  resetForm: function() {
    document.getElementById("update-form").reset();
  },
  change: function() {
    window.location.href = "profile/profile.html?id=" + localStorage.getItem("id")
  }
}
