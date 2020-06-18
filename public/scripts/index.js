// Burger Button

var navSecondary = document.querySelector(".navigation-secondary");

function showMenu(){
    if(navSecondary.style.display === "none"){
        navSecondary.style.display = "flex";
    } else {
        navSecondary.style.display = "none";
    }
}

