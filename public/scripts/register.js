const name = document.getElementById('full-name');
const questTitle = document.getElementById('quest-title');
const completionDate = document.getElementById('date');
//const link = document.getElementById('link');
const submitBtn = document.getElementById('submit-btn');
var modal = document.querySelector('.modal');
var registerContainer = document.querySelector('.register-container');
const image = document.getElementById('img');
//var item = document.querySelector('input');



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

    //once everything is done, function checks the variable proceed meaning everything is valid
    //if (proceed) {
      //the user then receives an alert to confirm and asked to press OK or CANCEL
  if (confirm("Confirm?")) {
    modal.style.display = "flex";
    registerContainer.style.filter = "brightness(70%)";
  }
  else {

  }

  
 db.put(image.name)
  .then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    
    let downloadURL = db.getDownloadUrl;
    });
    

  db.collection("finishers").add({
    name: name.value,
    quest: questTitle.value,
    completionDate: completionDate.value,
    image: downloadURL

    
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });

  /*const autoId = rootRef.push().key;
  rootRef.child(autoId).set({
    name: name.value,
    quest: questTitle.value,
    completionDate: completionDate.value,
    //image: image.value;
    //link: link.value 
  });*/
});
