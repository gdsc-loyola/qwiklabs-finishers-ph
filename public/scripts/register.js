const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const questTitle = document.getElementById('quest-title');
const date = document.getElementById('date');
const link = document.getElementById('link');
const submitBtn = document.getElementById('submit-btn');
var modal = document.querySelector('.modal');
var registerContainer = document.querySelector('.register-container');

// const database = firebase.database();
// const rootRef = database.ref('/finishers');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
 /* const autoId = rootRef.push().key
  rootRef.child(autoId).set({
    first_name: firstName.value,
    last_name: lastName.value,
    quest_title: questTitle.value,
    date: date.value,
    link: link.value 
  }); */

  modal.style.display = "flex";
  registerContainer.style.filter = "brightness(70%)";

});
