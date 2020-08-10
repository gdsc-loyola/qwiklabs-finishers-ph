const cards = document.querySelector(".cards");

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


    cardsItem.classList.add("cards-item");
    card.classList.add("card");
    cardTopbar.classList.add("card-topbar");
    cardImage.classList.add("card-image");
    cardContent.classList.add("card-content");
    cardTitle.classList.add("card-title")
    cardText.classList.add("card-text");
    levelImg.classList.add("card-icon");
    hoursImg.classList.add("card-icon");
    creditsImg.classList.add("card-icon");
    stepsImg.classList.add("card-icon");
    cardBtnHolder.classList.add("card-btn-holder");
    cardBtnHolderButton.classList.add("card-btn");

    const gsReference = firebase.storage().refFromURL('gs://qwiklabs-finishers-ph-e7667.appspot.com/');
    let questRef = gsReference.child(String(quest.index)+".png");

    questRef.getDownloadURL().then(function(url) {
        console.log(url);
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

db.collection('quests').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        let quest = doc.data();
        console.log(quest);
        renderQuest(quest);
    });
});

function questSearch () {
    let filter, title;
    let quests = document.querySelectorAll(".card");
    filter = document.getElementById('questSearch').value;
    for(let i = 0; i < quests.length; i++){
        title = quests[i].querySelector(".card-title").textContent
        if (title.search(new RegExp(filter, "i"))>-1) {
            quests[i].style.display = "";    
        }
        else {
            quests[i].style.display = "none"; 
        }
    }
}
