// Initialize Firebase
var config = {
  apiKey: "AIzaSyDDsSMQ5fz__zVROPs58rqVnFlkcu15PF8",
  authDomain: "esof-423.firebaseapp.com",
  databaseURL: "https://esof-423.firebaseio.com",
  projectId: "esof-423",
  storageBucket: "esof-423.appspot.com",
  messagingSenderId: "991614948455"
};
firebase.initializeApp(config);


const storageService = firebase.storage();
const storageRef = storageService.ref();

document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
    
    let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function displayFile(dl){
  document.getElementById("files").innerHTML = document.getElementById("files").innerHTML + "<img src=\"" + dl + "\" style=\"width:25%; height:auto;\">"

}

function handleFileUploadSubmit(e) {
  const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      displayFile(downloadURL)
      console.log('File available at', downloadURL);
    });
     console.log('success');
     window.alert("success");

  });
}