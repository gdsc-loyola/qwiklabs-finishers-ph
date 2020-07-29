//////////////////////////////////  Feautred Quests Rendering  //////////////////////////////////////////////

// rendering function
const cards = document.querySelector(".home-cards");

function renderQuest(quest) {
    let cardsItem = document.createElement('li');
    let card = document.createElement('div');
    let cardTopbar = document.createElement('header');
    let cardImage = document.createElement('div');
    let cardImageImg = document.createElement('img')
    let cardContent = document.createElement('div');
    let cardTitle = document.createElement('div');
    let cardText = document.createElement('table');
    let levelHours = document.createElement('tr');
    let level = document.createElement('td');
    let levelImg = document.createElement('img');
    let levelSpan = document.createElement('span');
    let hours = document.createElement('td');
    let hoursImg = document.createElement('img');
    let hoursDataSpan = document.createElement('span');
    let hoursSpan = document.createElement('span');
    let creditsSteps = document.createElement('tr');
    let credits = document.createElement('td');
    let creditsImg = document.createElement('img');
    let creditsDataSpan = document.createElement('span');
    let creditsSpan = document.createElement('span');
    let steps = document.createElement('td');
    let stepsImg = document.createElement('img');
    let stepsDataSpan = document.createElement('span');
    let stepsSpan = document.createElement('span');
    let cardBtnHolder = document.createElement('div');
    let cardBtnHolderForm = document.createElement('form');
    let cardBtnHolderButton = document.createElement('button');

    cardsItem.appendChild (card);
    card.appendChild(cardTopbar);
    card.appendChild(cardImage);
    cardImage.appendChild(cardImageImg);
    card.appendChild(cardContent);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardText);
    cardText.appendChild(levelHours);
    levelHours.appendChild(level);
    level.appendChild(levelImg);
    level.appendChild(levelSpan);
    levelHours.appendChild(hours);
    hours.appendChild(hoursImg);
    hours.appendChild(hoursDataSpan);
    hours.appendChild(hoursSpan);
    cardText.appendChild(creditsSteps);
    creditsSteps.appendChild(credits);
    credits.appendChild(creditsImg);
    credits.appendChild(creditsDataSpan);
    credits.appendChild(creditsSpan);
    creditsSteps.appendChild(steps);
    steps.appendChild(stepsImg);
    steps.appendChild(stepsDataSpan);
    steps.appendChild(stepsSpan)
    cardContent.appendChild(cardBtnHolder);
    cardBtnHolder.appendChild(cardBtnHolderForm);
    cardBtnHolderForm.appendChild(cardBtnHolderButton);


    cardsItem.classList.add("home-cards-item");
    card.classList.add("home-card");
    cardTopbar.classList.add("home-card-topbar");
    cardImage.classList.add("home-card-image");
    cardContent.classList.add("home-card-content");
    cardTitle.classList.add("home-card-title")
    cardText.classList.add("home-card-text");
    levelImg.classList.add("home-card-icon");
    hoursImg.classList.add("home-card-icon");
    creditsImg.classList.add("home-card-icon");
    stepsImg.classList.add("home-card-icon");
    cardBtnHolder.classList.add("home-card-btn-holder");
    cardBtnHolderButton.classList.add("home-card-btn");

    let gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/')

    let questRef = gsReference.child(String(quest.index)+".png");

    questRef.getDownloadURL().then(function(url) {
        cardImageImg.src = url;
    })

    cardTitle.textContent = quest.name;
    levelImg.src = "./assets/images/vectors/level.png";
    levelSpan.textContent = quest.level;
    hoursImg.src = "./assets/images/vectors/hours.png";
    hoursDataSpan.textContent = String(quest.hours);
    hoursSpan.textContent = " hours";
    creditsImg.src = "./assets/images/vectors/credits.png";
    creditsDataSpan.textContent = String(quest.credits);
    creditsSpan.textContent = " credits";
    stepsImg.src = "./assets/images/vectors/steps.png";
    stepsDataSpan.textContent = String(quest.steps);
    stepsSpan.textContent = " steps";
    cardBtnHolderForm.target="_blank";
    cardBtnHolderForm.action = "https://www.qwiklabs.com/quests/" + quest.index ;
    cardBtnHolderButton.type = "submit";
    cardBtnHolderButton.textContent = "Learn More";

    cards.appendChild(cardsItem);
}

// getting data
db.collection('quests').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        let quest = doc.data();
        if(quest.featured){
            console.log(quest);
            renderQuest(quest);
        }
    });
});

/////////////////////////////////  Featured Finishers Rendering  //////////////////////////////////////////////
var finishers = 0;
// rendering function
const collection = document.querySelector(".people-collection");

function renderFinisher(finisher) {
    let temp = document.getElementsByTagName("template")[0];
    let clone = temp.content.cloneNode(true);
    let image = clone.querySelector("img");
    let name = clone.querySelector(".person-name")
    let quest = clone.querySelector("#quest")
    let completionDate = clone.querySelector("#completionDate")
    
    let gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/finishers_imgs/')

    let finisherRef = gsReference.child(finisher.name);
    image.alt = finisher.name;
    
    let finisherRef = gsReference.child("Waving_GREEN.png");

    if (finisher.image !== "finishers-imgs/Waving_GREEN.png") {
        finisherRef = gsReference.child(finisher.name);
    }
    finisherRef.getDownloadURL().then( function ( url ) {
        image.src = url;
    })

    name.textContent = finisher.name;
    quest.textContent = finisher.quest;
    completionDate.textContent = moment(finisher.completionDate).format('MMM D, YYYY');

    collection.appendChild(clone);
}


// getting data
db.collection('finishers').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        let finisher = doc.data();
        if (finishers <= 12 && finisher.latest) {
            console.log(finisher.latest);
            renderFinisher(finisher);
            finishers ++;
        }
    });
});
