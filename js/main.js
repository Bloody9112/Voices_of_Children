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

changeBackground(newsBlock1, './img/main/section_3/frame_1.jpg');
changeBackground(newsBlock2, './img/main/section_3/frame_2.jpg');
changeBackground(newsBlock3, './img/main/section_3/frame_3.jpg');


AOS.init({
  disable: function () {
    var maxWidth = 800;
    return window.innerWidth < maxWidth;
  }
});

/* Animations */

let animationStarted = false;

function startCounterAnimation() {
  if (animationStarted) {
    return;
  }

  const dataNumbers = document.querySelectorAll('.block p');
  animationStarted = true;

  dataNumbers.forEach((element) => {
    const originalNumberText = element.textContent.trim();
    const targetNumber = parseInt(originalNumberText.replace(/\s/g, '').replace(/\+/g, ''));
    const hasPlus = originalNumberText.includes('+');
    const plusSign = hasPlus ? '+' : '';
    let currentNumber = 0;
    let animationDuration;

    if (targetNumber > 100000) {
      animationDuration = 200;
    } else if (targetNumber > 1000) {
      animationDuration = 500;
    } else {
      animationDuration = 1000;
    }

    const updateNumber = () => {
      if (currentNumber < targetNumber) {
        if (targetNumber > 100000) {
          currentNumber += 1250;
        } else if (targetNumber > 1000) {
          currentNumber += 6;
        } else {
          currentNumber += 1;
        }
        element.textContent = (Math.floor(currentNumber)).toLocaleString() + plusSign;
        setTimeout(updateNumber, animationDuration / targetNumber);
      }
    };

    updateNumber();
  });
}


window.addEventListener('scroll', () => {
  const sectionLeft = document.querySelector('.section_4--chart-left');
  const sectionLeftTop = sectionLeft.getBoundingClientRect().top;

  if (sectionLeftTop < window.innerHeight) {
    startCounterAnimation();
  }
});


/* Slider */

$(document).ready(function () {
  const images = [
    'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 61.29%), linear-gradient(0deg, rgba(24, 44, 60, 0.3) 0%, rgba(24, 44, 60, 0.3) 100%), url("./img/main/media_1.jpg") center / cover no-repeat',
    'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 61.29%), linear-gradient(0deg, rgba(24, 44, 60, 0.3) 0%, rgba(24, 44, 60, 0.3) 100%), url("./img/main/media_2.jpg") center / cover no-repeat',
    'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 61.29%), linear-gradient(0deg, rgba(24, 44, 60, 0.3) 0%, rgba(24, 44, 60, 0.3) 100%), url("./img/main/media_3.jpg") center / cover no-repeat',
    'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 61.29%), linear-gradient(0deg, rgba(24, 44, 60, 0.3) 0%, rgba(24, 44, 60, 0.3) 100%), url("./img/main/media_4.jpg") center / cover no-repeat'
  ];

  const photo1 = $('.photo_1');
  let currentSlide = 0;
  let mobileStylesApplied = false;

  function changeBackgroundImage(index) {
    photo1.css('background', images[index]);
  }

  function setActive(index) {
    $('.section_1--left-photos ul li').removeClass('active');
    $(`#slide${index + 1}`).addClass('active');
  }

  function autoplay() {
    setInterval(function () {
      currentSlide = (currentSlide + 1) % images.length;
      changeBackgroundImage(currentSlide);
      setActive(currentSlide);

      if (currentSlide === 0) {
        $('.section_1--left-photos ul li').removeClass('active');
        $('#slide1').addClass('active');
      }
    }, 4000);
  }

  function applyMobileStyles() {
    let windowWidth = $(window).width();

    if (windowWidth <= 1075 && !mobileStylesApplied) {
      $('.photo_1').addClass('mobile-styles');
      mobileStylesApplied = true;
    } else if (windowWidth > 1075 && mobileStylesApplied) {
      $('.photo_1').removeClass('mobile-styles');
      mobileStylesApplied = false;
    }
  }

  function handleSlider() {
    let windowWidth = $(window).width();

    if (windowWidth <= 1075 && !mobileStylesApplied) {
      applyMobileStyles();
    } else if (windowWidth > 1075 && mobileStylesApplied) {
      applyMobileStyles();
    }
  }

  function applyMobileStylesOnLoad() {
    handleSlider();
    applyMobileStyles();
  }

  applyMobileStylesOnLoad();

  autoplay();

  $(window).on('resize', function () {
    handleSlider();
  });

  $('.photo_1').on('afterChange', function (event, slick, currentSlide) {
    setActive(currentSlide);
    applyMobileStyles();
  });

  $('.section_1--left-photos ul li').on('click', function () {
    var index = $(this).index();
    $('.photo_1').slick('slickGoTo', index);
    currentSlide = index;
  });

  setActive(currentSlide);
});


/* Form Validation*/

function validateField(inputField) {
  var errorMsg = document.getElementById('error-msg');
  if (inputField.value === "") {
      errorMsg.innerHTML = "Це поле обов'язкове для заповнення";
      errorMsg.style.display = "block";
  } else {
      errorMsg.innerHTML = "";
      errorMsg.style.display = "none";
  }
}

function validateForm() {
  var input = document.getElementById('city');
  validateField(input);
  if (input.value === "") {
      return false;
  }
  return true;
}


function validateFooterField(inputField) {
  var errorMsg = document.getElementById('footer-error-msg');
  var email = inputField.value.trim();

  if (email === "") {
    errorMsg.innerHTML = "Це поле обов'язкове для заповнення";
    errorMsg.style.display = "block";
    return false;
  } else {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
      errorMsg.innerHTML = "Введіть дійсну електронну адресу";
      errorMsg.style.display = "block";
      return false;
    } else {
      errorMsg.innerHTML = "";
      errorMsg.style.display = "none";
      return true;
    }
  }
}

function validateFooterForm(event) {
  event.preventDefault();
  var input = document.getElementById('footer-email');
  var isValid = validateFooterField(input);

  if (isValid) {
    console.log('Форма відправлена!');
  } else {
    console.log('Форма не відправлена через помилки у введенні.');
  }
}

// На випадок, якщо у вас є кнопка, яка запускає відправку форми
var submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', function(event) {
  var form = document.querySelector('.footer_input');
  validateFooterForm(event);
});



