// Firestore >> finishers.html

// rendering function
const groups = document.querySelector(".finisher-groups");

function renderFinisher(finisher) {
    //NOTE: Doesn't include finished quests, only rendering the finisher themself
    let finisherGroupBody = document.createElement('div');
    let finisherMember = document.createElement('div');
    let finisherImg = document.createElement('img');
    let finisherName = document.createElement('h5');
    let finisherCompletionDate = document.createElement('p');

    finisherGroupBody.appendChild (finisherMember);
    finisherMember.appendChild (finisherImg);
    finisherMember.appendChild(finisherName);
    finisherMember.appendChild (finisherCompletionDate);

    finisherGroupBody.classList.add("finisher-group-body");
    finisherMember.classList.add("finisher-member");
   
    finisherImg.src = finishers.image;

    groups.appendChild(finisherMember);
}

// getting data
db.collection('finishers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        var quest = doc.data();
        console.log(finisher);
        renderQuest(finisher);
    });
});