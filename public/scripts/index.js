// Burger Button

var navSecondary = document.querySelector(".navigation-secondary");

window.addEventListener("resize", () => {
    if(window.innerWidth > 850){
        navSecondary.style.display = "inline-block";
    } else {
        navSecondary.style.display = "none";
    }
})

function showMenu(){
    if(navSecondary.style.display !== "flex"){
        navSecondary.style.display = "flex";
    } else {
        navSecondary.style.display = "none";
    }
}



