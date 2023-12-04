/* Menu button */

const navBtn = document.querySelector('.header--menu-btn');
const navIcon = document.querySelector('.header--menu-icon')
const nav = document.querySelector('.header--top-row')

navBtn.onclick = function () {
    navIcon.classList.toggle('header--menu-icon--active')
    nav.classList.toggle('header--top-row--mobile')
    document.body.classList.toggle('no-scroll')
}

