const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const name = document.getElementById('full-name');
const questTitle = document.getElementById('quest-title');
const completionDate = document.getElementById('date');
//const link = document.getElementById('link');
const submitBtn = document.getElementById('submit-btn');

var modal = document.querySelector('.modal');
var registerContainer = document.querySelector('.register-container');


var image = document.getElementById("finisher-img");

// Create a root reference
var storageRef = firebase.storage().ref("finishers-imgs");

// Create a reference to 'mountains.jpg'
var imgRef = storageRef.child(image);

// Create a reference to 'images/mountains.jpg'
var finisherRef = storageRef.child('finishers-imgs/'+name.value);

// Validation of input
/*var proceed=false;

        function checkName() {
          //checks if name consists of a-z characters and between 2-20 characters
          var name=document.getElementById("full-name").value;
          var check = /^[A-Za-z\s\'\-]{2,20}$/;
      
            //output cofirmation or error to "fNameValid"
            if (check.test(name)) {
              item.style.border = "4px solid green";
              //since it's valid, proceed variable is changed to TRUE
              proceed=true;
            }
            else {
              
              proceed=false;
            }
        }   
          
        }*/
        
submitBtn.addEventListener('click', (e) => {

  e.preventDefault();

  if (confirm("Confirm?")) {

    modal.style.display = "flex";
    registerContainer.style.filter = "brightness(70%)";
    
    fileUpload.on("change", function(evt) {
      var firstFile = evt.target.file[0]; // get the first file uploaded
      var uploadTask = storageRef.put(firstFile);
      uploadTask.on("state_changed", function progress(snapshot) {
      console.log(snapshot.totalBytesTransferred); // progress of upload
      });
    });

    db.collection("finishers").add({
      name: name.value,
      quest: questTitle.value,
      completionDate: completionDate.value,
      image: imgRef.fullPath
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

});
