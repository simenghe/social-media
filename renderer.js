// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var firebaseConfig = {
    apiKey: "AIzaSyANPOMOHsQyCL-ky6fy3BxfqSVCkB7AHqc",
    authDomain: "social-media-cda47.firebaseapp.com",
    databaseURL: "https://social-media-cda47.firebaseio.com",
    projectId: "social-media-cda47",
    storageBucket: "",
    messagingSenderId: "665696116658",
    appId: "1:665696116658:web:d0c9c422c27d6135"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var messageInput = document.getElementById("messageStream");
  messageInput.addEventListener('change',function(){
      console.log(messageInput.value);
      messageInput.value = ""
    }
);
