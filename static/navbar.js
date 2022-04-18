$(document).ready(() => {
  toggleButton = $('.nav-collapse')
  logo = $('#logo')
  nav = $('nav')
  logo.click(() => {
    window.location.href = "/"
  })
  toggleButton.click(() => {
    console.log('clicked')
    toggleButton.toggleClass('nav-open')
    setTimeout(() => {
      nav.toggleClass('nav-open')
    }, 500)
  })
})