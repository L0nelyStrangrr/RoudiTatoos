;let parallaxElements = document.querySelectorAll('.header__layer');


function parallax(event) {
    parallaxElements.forEach((element) => {
        let speed = element.getAttribute('data-speed');
        element.style.transform = 'translate('+event.clientX*speed/1000+'px, '+event.clientY*speed/4000+'px)'
    });
}

document.addEventListener('mousemove', parallax)


