/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function setTopnavMode() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

function scrollCarousel(direction) {
    const wrapper = document.getElementById('project-wrapper');
    const scrollAmount = wrapper.clientWidth;
    if (direction === 'left') {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
$(document).ready(function () {
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top -55,
      },
      500,
      "swing"
    );
  });

  $(window).on("scroll load", function () {
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".topnav a").removeClass("active");
        $(".topnav").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });
});