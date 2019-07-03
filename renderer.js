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
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
// Initialize Firebase
var chatList = document.getElementById("chatList");
firebase.initializeApp(firebaseConfig);
function updateScroll(){
  console.log("Scrolling to the bottom.");
  var element = document.getElementById("chatDiv");
  element.scrollTop = element.scrollHeight;
  
}
var db = firebase.firestore();
var content = '';
var globalList = [];
var dataList = [];
function readData() {
  db.collection("chatroom1").orderBy("timestamp").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      content = '<li class="collection-item avatar">' +
        '            <i class="material-icons circle red">play_arrow</i>' +
        '            <span class="title">' + doc.data().user + '</span>' +
        '            <p>' + doc.data().msg + '</p>' +
        '          </li>';
      console.log(doc.data());
      dataList.push(doc.data());
      console.log(dataList.length)
      chatList.append(createElementFromHTML(content));
      console.log(`${doc.id} => ${doc.data().msg}`);
    });
  },
  dataList.forEach(function(i){
    console.log("RAW "+i);
    console.log(i);
  })
  );
  updateScroll()
}
readData();
setInterval(updateScroll,1000);
var messageInput = document.getElementById("messageStream");
messageInput.addEventListener('change', function () {
  let today = new Date();
  let easternTime = today.toLocaleString('en-US', { timeZone: 'America/Toronto' });
  console.log(easternTime);
  db.collection("chatroom1").add({
    msg: messageInput.value,
    user: "Simeng He",
    date: easternTime,
    timestamp: new Date(),
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
db.collection("chatroom1")
  .onSnapshot({
    // Listen for document metadata changes
    includeMetadataChanges: true
  }, function (doc) {
    console.log(doc.id);
    chatList.innerHTML = "";
    readData();
    updateScroll();
  });

