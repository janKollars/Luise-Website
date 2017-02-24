// //test for touch events support and if not supported, attach .no-touch class to the HTML tag.
//
// if (!("ontouchstart" in document.documentElement)) {
// document.documentElement.className += " no-touch";
// }

// Smooth Scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// menutop-burger
burger = document.getElementById("burger");
nav = document.getElementById("top-nav");

burger.addEventListener("click", opennav);
function opennav() {
  burger.removeEventListener("click", opennav);
  burger.classList.add("is-open");
  nav.classList.add("is-open");
  burger.addEventListener("click", closenav);
  nav.addEventListener("click", closenav, true);
}
function closenav() {
  burger.removeEventListener("click", closenav);
  nav.removeEventListener("click", closenav);
  burger.classList.remove("is-open");
  nav.classList.remove("is-open");
  burger.addEventListener("click", opennav)
}

// Parallax
$(window).scroll(function(){

  var wScroll = $(this).scrollTop();
  $('.parallax-title').css({
    'transform' : 'translate(0px, '+ wScroll /4.5 + '%)'
  });
});
