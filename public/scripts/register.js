
//const {storageRef, db, firebase } = require('./scripts/firebase.js');
const name = document.getElementById('full-name');
const questTitle = document.getElementById('quest-title');
const completionDate = document.getElementById('date');
//const link = document.getElementById('link');
const submitBtn = document.getElementById('submit-btn');
var fileUpload = document.getElementById('finisher-img')
var modal = document.querySelector('.modal');
var registerContainer = document.querySelector('.register-container');

const db = firebase.firestore();

var storeRef = firebase.storage().ref('finishers-imgs/'+name.value);
var imgRef = storeRef.child(fileUpload);



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
    
    fileUpload.addEventListener("change", function(evt) {
      var firstFile = evt.target.file[0]; // get the first file uploaded
      var uploadTask = storeRef.put(firstFile);
      uploadTask.on('state_changed', 
        function progress(snapshot) {
          console.log(snapshot.totalBytesTransferred); // progress of upload
        },
        function error(err) {

        },
        function complete() {
          
        }
        
      );    

    });
    
    db.collection("finishers").add({
      
      name: name.value,
      quest: questTitle.value,
      completionDate: completionDate.value,
      image: storeRef.fullpath
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

  }

});
