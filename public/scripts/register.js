
const name = document.getElementById("fullName");
const questTitle = document.getElementById('quest-title');
const completionDate = document.getElementById('date');
const submitBtn = document.getElementById('submit-btn');
var fileUpload = document.getElementById('finisher-img')
var modal = document.querySelector('.modal');
var registerContainer = document.querySelector('.register-container');
var questsDict = []; 
var storageRef = firebase.storage().ref('finishers_imgs/');
var questIndex;
const quests = document.querySelector('#quest-title');

db.collection('quests').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
      var quest = doc.data();
      renderSelectQuest(quest);
      questsDict[quest.name]=quest.index;
      
  });
});
console.log(questsDict);
function renderSelectQuest(quest) {
  let questName = document.createElement('option');
  questName.textContent = quest.name;
  quests.appendChild(questName);
}

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

fileUpload.addEventListener("change", function(evt) {
  var imgRef = storageRef.child(name.value);
  var firstFile = evt.target.files[0]; // get the first file uploaded
  var uploadTask = imgRef.put(firstFile);
  uploadTask.on('state_changed', 
    function progress(snapshot) {
      console.log(snapshot.totalBytesTransferred); // progress of upload
    },
    function error(err) {
      
    },
    function complete() {
              
    }); 
  });
        
submitBtn.addEventListener('click', (e) => {

  var imgRef = storageRef.child(name.value);
  e.preventDefault();

  if (confirm("Confirm?")) {
    
    modal.style.display = "flex";
    registerContainer.style.filter = "brightness(70%)";
    console.log(questsDict);
    console.log(questTitle);
    console.log(questTitle.value);
    console.log(questsDict[questTitle.value]);
    db.collection("finishers").add({
      name: name.value,
      quest: questTitle.value,
      completionDate: completionDate.value,
      image: imgRef.fullPath,
      index: questsDict[questTitle.value]
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
});
