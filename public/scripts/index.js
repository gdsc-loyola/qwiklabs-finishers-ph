const navToggle = () => {
  const secondaryNav = document.querySelector('.navigation-secondary')
  const burger = document.querySelector('.burger')

  burger.addEventListener('click', () => {
    console.log(secondaryNav)
    secondaryNav.classList.toggle('nav-display')
    console.log('working')
  })
}

navToggle()