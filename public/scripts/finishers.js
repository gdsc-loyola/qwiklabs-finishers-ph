const groups = document.querySelector(".finisher-group-body");
const quests = document.querySelector('#quest-title');
const dates = document.querySelector('#completionDate');

var storageRef = firebase.storage().ref('finishers_imgs/');

db.collection('quests').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
      var quest = doc.data();
      console.log(quest);
      renderSelectQuest(quest);    
  });
});

function renderSelectQuest(quest) {
  let questName = document.createElement('option');
  questName.textContent = quest.name;
  quests.appendChild(questName);
}

db.collection('finishers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        var finisher = doc.data();
        renderFinisher(finisher);
        renderSelectCompletionDate(finisher); 
    });
});

function renderSelectCompletionDate(finisher) {
    let questCompletionDate = document.createElement('option');
    questCompletionDate.textContent = moment(finisher.completionDate).format('MMM D, YYYY');
    console.log("Quest Completion Date: " + questCompletionDate);
    dates.appendChild(questCompletionDate);
  }

function renderFinisher(finisher) {
    
    let finisherMember = document.createElement('div');
    let finisherImg = document.createElement('img');
    let finisherName = document.createElement('h5');
    let finisherCompletionDate = document.createElement('p');

    finisherMember.appendChild(finisherImg);
    finisherMember.appendChild(finisherName);
    finisherMember.appendChild(finisherCompletionDate);
    
    finisherMember.classList.add("finisher-member");
   
    finisherName.textContent = finisher.name;
    finisherCompletionDate.textContent = moment(finisher.completionDate).format('MMM D, YYYY');

    var gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/finishers_imgs/')

    // Create a reference to the file we want to download
    var finisherRef = gsReference.child(finisher.name);
    //Get the download URL
    finisherRef.getDownloadURL().then(function(url) {
        finisherImg.src = url;
    })
    groups.appendChild(finisherMember);
}

function finisherSearch () {
    var input, filter, txtValue;
    input = document.getElementById('filterSearch');
    filter = input.value;
    var finisherMembers = document.getElementsByClassName("finisher-member");
    for(var i = 0; i < finisherMembers.length; i++){
        console.log(finisherMembers[i]);
        txtValue = finisherMembers[i].textContent;
        if (txtValue.search(new RegExp(filter, "i"))>-1) {
            finisherMembers[i].style.display = "";    
        }
        else {
            finisherMembers[i].style.display = "none"; 
        }
    }
}

function dateSearch () {
    var input, filter, txtValue;
    input = document.getElementById('completionDate');
    filter = input.value;
    var finisherMembers = document.getElementsByClassName("finisher-member");
    for(var i = 0; i < finisherMembers.length; i++){
        console.log(finisherMembers[i]);
        txtValue = finisherMembers[i].textContent;
        if(filter!="View All") {
            if (txtValue.search(new RegExp(filter, "i"))>-1) {
                finisherMembers[i].style.display = "";    
            }
            else {
                finisherMembers[i].style.display = "none"; 
            }
        }
    }
}