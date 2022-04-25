$(document).ready(() => {
  toggleButton = $('.nav-collapse')
  logo = $('#logo')
  nav = $('.mobile-navbar')
  logo.click(() => {
    window.location.href = "/"
  })
  toggleButton.click(() => {
    toggleButton.toggleClass('nav-open')
    if(nav.hasClass('nav-open')) {
      nav.removeClass('open-animation')
      setTimeout(() => {
        nav.removeClass('nav-open')
      }, 600)
    } else {
      nav.addClass('nav-open')
      setTimeout(() => {
        nav.addClass('open-animation')
      }, 500)
    }
  })
})