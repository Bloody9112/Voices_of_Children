/* Menu button */

const navBtn = document.querySelector('.header--menu-btn');
const navIcon = document.querySelector('.header--menu-icon')
const nav = document.querySelector('.header--top-row')

navBtn.onclick = function () {
    navIcon.classList.toggle('header--menu-icon--active')
    nav.classList.toggle('header--top-row--mobile')
    document.body.classList.toggle('no-scroll')
}


/* News */

const newsBlock1 = document.getElementById('newsBlock1');
const newsBlock2 = document.getElementById('newsBlock2');
const newsBlock3 = document.getElementById('newsBlock3');


function changeBackground(element, imageUrl) {
    element.style.backgroundImage = `url(${imageUrl})`;
}

changeBackground(newsBlock1, '../img/main/section_3/frame_1.jpg');
changeBackground(newsBlock2, '../img/main/section_3/frame_2.jpg');
changeBackground(newsBlock3, '../img/main/section_3/frame_3.jpg');

