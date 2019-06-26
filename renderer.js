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
db.collection("chatroom1").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  
    console.log(`${doc.id} => ${doc.data().msg}`);
  });
});

var messageInput = document.getElementById("messageStream");
messageInput.addEventListener('change', function () {
  let today = new Date();
  let easternTime = today.toLocaleString('en-US', { timeZone: 'America/Toronto' });
  console.log(easternTime);
  let p = document.createElement("h1");
  p.innerHTML = "Ratnu Test"
  var chatList = document.getElementById("chatList");
  chatList.insertAdjacentElement("afterend", p);

  db.collection("chatroom1").add({
    msg: messageInput.value,
    user: "tempUser",
    date: easternTime,
    born: new Date(),
    role: "tempRole"
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  console.log(messageInput.value);
  messageInput.value = "";
}
);
