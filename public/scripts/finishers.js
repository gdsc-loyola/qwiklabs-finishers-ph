const finisherGroups = document.querySelector(".finisher-groups");
const quests = document.querySelector('#quest-title');
const dates = document.querySelector('#completionDate');
const questsDict = []; 
const questsBodyDict = [];


db.collection('quests').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    let quest = doc.data();
    let count = 0;
    let finishers = 0;
    db.collection('finishers').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            let finisher = doc.data();
            if (finisher.index==quest.index && count < 1) {
                renderSelectQuest(quest);
                renderFinisherGroup(quest); 
                questsDict[quest.name] = quest.index;  
                questsBodyDict[quest.name] = quest.index+"body";
                console.log("count: "+ count,  quest.name);
                count ++;
                
            }
            if(finisher.index==quest.index && finishers <= 10) {
                renderFinisher(finisher);
                renderSelectCompletionDate(finisher); 
                finishers++;
            }
        }); 
    });
  });
});

function renderSelectQuest(quest) {
    let questName = document.createElement('option');
    questName.textContent = quest.name;
    quests.appendChild(questName);
}

function renderSelectCompletionDate(finisher) {
    let questCompletionDate = document.createElement('option');
    questCompletionDate.textContent = moment(finisher.completionDate).format('MMM D, YYYY');
    dates.appendChild(questCompletionDate);
}

function renderFinisherGroup (quest) {
    let finisherGroup = document.createElement('div');

    let finisherGroupHeader = document.createElement('div');
    
    let finisherGroupHeaderTitle = document.createElement('div');

    let finisherGroupBody = document.createElement('div');

    let questBadge = document.createElement('img');
    let questTitle = document.createElement('h3');

    let finisherGroupHeaderButtonTop = document.createElement('div');
    let viewMoreTop = document.createElement('a');
    let checkQuestTop = document.createElement('a');

    let finisherGroupHeaderButtonBottom = document.createElement('div');
    let viewMoreBottom = document.createElement('a');
    let checkQuestBottom = document.createElement('a'); 

    finisherGroup.appendChild(finisherGroupHeader);

    finisherGroupHeader.appendChild(finisherGroupHeaderTitle);
    finisherGroupHeader.appendChild(finisherGroupHeaderButtonTop);
    finisherGroupHeaderTitle.appendChild(questBadge);
    finisherGroupHeaderTitle.appendChild(questTitle);

    finisherGroupHeaderButtonTop.appendChild(viewMoreTop);
    finisherGroupHeaderButtonTop.appendChild(checkQuestTop);

    finisherGroup.appendChild(finisherGroupBody);

    finisherGroup.appendChild(finisherGroupHeaderButtonBottom);
    finisherGroupHeaderButtonBottom.appendChild(viewMoreBottom);
    finisherGroupHeaderButtonBottom.appendChild(checkQuestBottom);
    
    finisherGroup.id = quest.index;
    finisherGroupBody.id = quest.index+"body";

    finisherGroup.classList.add("finisher-group");
    finisherGroupHeader.classList.add("finisher-group-header");
    finisherGroupHeaderTitle.classList.add("finisher-group-header-title");
    finisherGroupHeaderButtonTop.classList.add("finisher-group-header-upperbtn");
    finisherGroupBody.classList.add("finisher-group-body");
    finisherGroupHeaderButtonBottom.classList.add("finisher-group-header-lowerbtn");
    viewMoreTop.classList.add("finisher-btn-1");
    checkQuestTop.classList.add("finisher-btn-2");
    viewMoreBottom.classList.add("finisher-btn-1");
    checkQuestBottom.classList.add("finisher-btn-2");

    const gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/')

    const questRef = gsReference.child(String(quest.index)+".png");

    questBadge.alt = quest.name + "badge";

    questRef.getDownloadURL().then(function(url) {
        questBadge.src = url;
    })

    questTitle.textContent = quest.name;
    viewMoreTop.href = "finisher_learn_more.html";
    viewMoreTop.textContent = "View More";
    checkQuestTop.target = "_blank";
    checkQuestTop.href = "https://www.qwiklabs.com/quests/" + quest.index ;
    checkQuestTop.textContent = "Check Quest";

    viewMoreBottom.href = "finisher_learn_more.html";
    viewMoreBottom.textContent = "View More";
    checkQuestBottom.target = "_blank";
    checkQuestBottom.href = "https://www.qwiklabs.com/quests/" + quest.index ;
    checkQuestBottom.textContent = "Check Quest";

    finisherGroups.appendChild(finisherGroup);
}

function renderFinisher(finisher) {
    let finisherGroup = document.getElementById(finisher.index+"body");

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

    let gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/finishers_imgs/')
    let finisherRef = gsReference.child(finisher.name);

    finisherImg.alt = finisher.name;

    finisherRef = gsReference.child("Waving_GREEN.png");
    if (finisher.image !== "finishers-imgs/Waving_GREEN.png") {
        finisherRef = gsReference.child(finisher.name);
    }
    finisherRef.getDownloadURL().then( function ( url ) {
        finisherImg.src = url;
    })

    finisherGroup.appendChild(finisherMember); 
}

function filterSearch () {
    finisherSearch ();
    questSearch ();
    dateSearch ();
}

function finisherSearch () {
    let input, filter, txtValue;
    input = document.getElementById('filterSearch');
    filter = input.value;
    let finisherMembers = document.getElementsByClassName("finisher-member");
    for(let i = 0; i < finisherMembers.length; i++){

        txtValue = finisherMembers[i].textContent;

        if (txtValue.search(new RegExp(filter, "i"))>-1) {
            finisherMembers[i].style.display = "";
        }
        else {
            finisherMembers[i].style.display = "none"; 
        }
    }
    let groups = document.querySelectorAll(".finisher-group");
    groups.forEach(group => {
        let groupBody = group.querySelector(".finisher-group-body");
        let groupBodyFinisher = groupBody.querySelectorAll(".finisher-member")
        var numberOfFinisher = 0;
        groupBodyFinisher.forEach(finisher => {
            if(finisher.style.display == ""){
                numberOfFinisher++;
            }
        })
        if(numberOfFinisher === 0){
            group.style.display = "none";
        } else {
            group.style.display = "block";
        }
    })
}

function questSearch () {
    let input, filter, txtValue;
    input = document.getElementById('quest-title');
    filter = questsDict[input.value];
    let finisherGroups = document.getElementsByClassName("finisher-group");
    for(let i = 0; i < finisherGroups.length; i++){
        txtValue = finisherGroups[i].id;
        if(filter!="View All") {
            if (txtValue.search(new RegExp(filter, "i"))>-1) {
                finisherGroups[i].style.display = "";    
            }
            else {
                finisherGroups[i].style.display = "none"; 
            }
        }
    }
    let groups = document.querySelectorAll(".finisher-group");
    groups.forEach(group => {
        let groupBody = group.querySelector(".finisher-group-body");
        let groupBodyFinisher = groupBody.querySelectorAll(".finisher-member")
        var numberOfFinisher = 0;
        groupBodyFinisher.forEach(finisher => {
            if(finisher.style.display == ""){
                numberOfFinisher++;
            }
        })
        if(numberOfFinisher === 0){
            group.style.display = "none";
        } else {
            group.style.display = "block";
        }
    })
}

function dateSearch () {
    let input, filter, txtValue;
    input = document.getElementById('completionDate');
    filter = moment(input.value).format('MMM D, YYYY')
    let finisherMembers = document.getElementsByClassName("finisher-member");
    for(let i = 0; i < finisherMembers.length; i++){
        txtValue = finisherMembers[i].textContent;
        if (txtValue.search(new RegExp(filter, "i"))>-1) {
            finisherMembers[i].style.display = "";    
        }
        else {
            finisherMembers[i].style.display = "none"; 
        }
    }
    let groups = document.querySelectorAll(".finisher-group");
    groups.forEach(group => {
        let groupBody = group.querySelector(".finisher-group-body");
        let groupBodyFinisher = groupBody.querySelectorAll(".finisher-member")
        var numberOfFinisher = 0;
        groupBodyFinisher.forEach(finisher => {
            if(finisher.style.display == ""){
                numberOfFinisher++;
            }
        })
        if(numberOfFinisher === 0){
            group.style.display = "none";
        } else {
            group.style.display = "block";
        }
    })
}