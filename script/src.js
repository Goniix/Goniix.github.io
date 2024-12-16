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

async function getSkills(){
  console.log("Fetching skills");
  const response = await fetch("skills.json");
  if (!response.ok) {
    throw new Error("Error fetching JSON");
  }
  return response.json();
}

$(document).ready(function () {
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top -100,
      },
      500,
      "swing"
    );
  });
  


  // Reference the skill container
  const skillContainer = document.getElementById("skill-container");
  getSkills().then((skills) => {
    skills.forEach((skill) => {

      const skillDiv = document.createElement("div");
      skillDiv.classList.add("skill-box");
      skillDiv.classList.add("tooltip");
      skillDiv.setAttribute("data-tooltip",skill.name+" - "+skill.level);

      skillDiv.innerHTML = `<img src=${skill.icon} alt=${skill.name} class="skill-icon">`
      // skillDiv.innerHTML += `<strong>${skill.name}</strong>`;
      skillContainer.appendChild(skillDiv);

    });
  });

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  $(window).on("scroll load", function () {
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 500;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".topnav a").removeClass("active");
        $(".topnav").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  
});