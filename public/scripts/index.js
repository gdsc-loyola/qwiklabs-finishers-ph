// Burger Button

const navSecondary = document.querySelector(".navigation-secondary");
const burgerBtn = document.querySelector(".burger_button");
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
        burgerBtn.classList.add("open");
    } else {
        navSecondary.style.display = "none";
        burgerBtn.classList.remove("open");
    }
}



