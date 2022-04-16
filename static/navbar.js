$(document).ready(() => {
  toggleButton = $('.nav-collapse')
  nav = $('nav')
  toggleButton.click(() => {
    console.log('clicked')
    toggleButton.toggleClass('nav-open')
    setTimeout(() => {
      nav.toggleClass('nav-open')
    }, 500)
  })
})