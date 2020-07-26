// Firestore >> finishers.html

// rendering function
const groups = document.querySelector(".finisher-group-body");

// Create a reference from a Google Cloud Storage URI

// getting data
db.collection('finishers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {

        var finisher = doc.data();
        
            console.log(finisher);
            renderFinisher(finisher);
        
    });
});

function renderFinisher(finisher) {
    //NOTE: Doesn't include finished quests, only rendering the finisher themself
    //let finisherGroupBody = document.createElement('div');
    let finisherMember = document.createElement('div');
    let finisherImg = document.createElement('img');
    let finisherName = document.createElement('h5');
    let finisherCompletionDate = document.createElement('p');

    //finisherGroupBody.appendChild(finisherMember);
    //finisherMember.appendChild(finisherImg);
    finisherMember.appendChild(finisherImg);
    finisherMember.appendChild(finisherName);
    finisherMember.appendChild(finisherCompletionDate);
    
    //finisherGroupBody.classList.add("finisher-group-body");
    finisherMember.classList.add("finisher-member");
   
    finisherName.textContent = finisher.name;
    finisherCompletionDate.textContent = moment(finisher.completionDate).format('MMM D, YYYY');
    var gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/finishers_imgs/')

    // Create a reference to the file we want to download
    var finisherRef = gsReference.child(finisher.name);
    //const img = Object.values(finisher).filter(data => finisherRef === data.ref)
    //Get the download URL
    finisherRef.getDownloadURL().then(function(url) {
        console.log(url);
        finisherImg.src = url;
    })

    groups.appendChild(finisherMember);
}

function finisherSearch () {
    var input, filter, txtValue;
    input = document.getElementById('filterSearch');
    filter = input.value.toUpperCase();
    txtValue = "Franz";
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        console.log("YAY");    
    }
}