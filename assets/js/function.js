// Smooth Scroll
// $(function() {
//   $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: target.offset().top
//         }, 1000);
//         return false;
//       }
//     }
//   });
// });

// Menu
const burger = document.getElementById("burger");
const nav = document.getElementById("top-nav");

burger.addEventListener("click", function () {
  burger.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});

// Parallax https://daverupert.com/2018/02/cheapass-parallax/
const title = document.querySelector('.parallax-title');
const speed = 0.4;
title.style.transform = 'translateY( calc( var(--scrollparallax) * 1px ) )';

function setScrollParallax() {
    title.style.setProperty("--scrollparallax", (document.body.scrollTop || document.documentElement.scrollTop) * speed);
    window.requestAnimationFrame( setScrollParallax );
}

window.requestAnimationFrame( setScrollParallax );
