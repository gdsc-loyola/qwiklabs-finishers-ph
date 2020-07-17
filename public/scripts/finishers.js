// Firestore >> finishers.html

// rendering function
const groups = document.querySelector(".finisher-group");

function renderFinisher(finisher) {
    //NOTE: Doesn't include finished quests, only rendering the finisher themself
    let finisherGroupBody = document.createElement('div');
    let finisherMember = document.createElement('div');
    let finisherImg = document.createElement('img');
    let finisherName = document.createElement('h5');
    //let finisherCompletionDate = document.createElement('p');

    finisherGroupBody.appendChild(finisherMember);
    finisherMember.appendChild(finisherImg);
    finisherMember.appendChild(finisherName);
   
    //finisherMember.appendChild(finisherCompletionDate);

    finisherGroupBody.classList.add("finisher-group-body");
    finisherMember.classList.add("finisher-member");
   
    finisherImg.src = finisher.image;
    finisherName.textContent = finisher.Name;
    //finisherCompletionDate.src = finisher.doc("finishers/quests");

    groups.appendChild(finisherGroupBody);
}

// getting data
db.collection('finishers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        var finisher = doc.data();
        console.log(finisher);
        renderFinisher(finisher);
    });
});