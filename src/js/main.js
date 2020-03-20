document.querySelectorAll('.header__btn').forEach(elem=>{elem.addEventListener('click', function(e){
  e.preventDefault();
  this.classList.toggle('header__btn-active')
  document.querySelector('.header__nav').classList.toggle('header__nav-active')
  document.querySelector('.header__content').classList.toggle('header__content-active')
  // document.querySelector('.header__logo').classList.toggle('header__logo-active')
  // document.querySelector('.header__rightside').classList.toggle('header__rightside-active')
  // document.querySelectorAll('.menu__item').forEach((item)=>{item.classList.toggle('menu__item-active')})
  document.body.classList.toggle('lock');
})})


let parallaxElements = document.querySelectorAll('.header__layer');


function parallax(event) {
    parallaxElements.forEach((element) => {
        let speed = element.getAttribute('data-speed');
        element.style.transform = 'translate('+event.clientX*speed/1000+'px, '+event.clientY*speed/4000+'px)'
    });
}

document.addEventListener('mousemove', parallax)



var swiper1 = new Swiper('.portfolio .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  navigation: {
        nextEl: '.portfolio .swiper-button-next',
        prevEl: '.portfolio .swiper-button-prev',
      },
  // init: false,
  pagination: {
    el: '.portfolio .swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      centeredSlides: false,
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  }
});

var swiper2 = new Swiper('.shop .swiper-container', {
  slidesPerView: 3,
  spaceBetween: 40,
  slidesPerGroup: 3,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.shop .swiper-button-next',
    prevEl: '.shop .swiper-button-prev',
  },
  // init: false,
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 100,
    },
  }
});

var swiper3 = new Swiper('.reviews .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 40,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.reviews .swiper-button-next'
  },
  // init: false,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 190,
    },
    2395: {
      slidesPerView: 2,
      spaceBetween: 190,
    },
  }
});


let modal = document.querySelector('.modal__window');
let modalTriggers = document.querySelectorAll('.modal__trigger')
let modalClosing = document.querySelector('.modal__close');
modalTriggers.forEach(function(elem) {
  elem.addEventListener('click', function(){
    modal.classList.toggle('modal__window-active')
  })
})

modalClosing.addEventListener('click', function() {
  modal.classList.remove('modal__window-active')
  
  }
)

window.addEventListener('click', function(e){
  if (e.target == modal) {
    modal.classList.remove('modal__window-active')
   
  }
})

document.querySelectorAll('.modal__trigger')[0].addEventListener('click', function(){
    modal.querySelector('p').innerHTML='Lorem lorem lorem lorem Lorem lorem lorem lorem Lorem lorem lorem lorem'
  })

  document.querySelectorAll('.modal__trigger')[1].addEventListener('click', function(){
    modal.querySelector('p').innerHTML='ipsum ipsum ipsum ipsum'
  })
  document.querySelectorAll('.modal__trigger')[2].addEventListener('click', function(){
    modal.querySelector('p').innerHTML='Lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
  })

  $(document).ready(function() {
    $('.header__navlink a').on("click", function(e) {
        e.preventDefault();
        var hrefClass = $(this).attr('href'),
            top = $(hrefClass).offset().top;
            document.querySelector('.header__nav').classList.remove('header__nav-active');
            document.querySelector('.header__btn').classList.remove('header__btn-active');
            document.body.classList.remove('lock');
            $('body, html').animate({scrollTop: top}, 1200);    
    });
});

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 600) {
      document.querySelector('.header__nav').classList.add('header__nav-sticky');
      document.querySelectorAll('.header__navlink').forEach(function(elem){
        elem.classList.add('header__navlink-sticky');
        document.querySelector('.header__layer').style.opacity = '0.5';
      })
      document.querySelector('.header__mobile').classList.add('header__mobile-sticky')
    }
    else if (window.pageYOffset < 600) {
      document.querySelector('.header__nav').classList.remove('header__nav-sticky');
      document.querySelectorAll('.header__navlink').forEach(function(elem){
        elem.classList.remove('header__navlink-sticky');
        document.querySelector('.header__layer').style.opacity = '0.8';
      })
      document.querySelector('.header__mobile').classList.remove('header__mobile-sticky')}})





