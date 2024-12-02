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
  const response = await fetch("skills.json")
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json(); // Parse the JSON response
  
  // .then(data => {
  //   return data.skills;
  // })
  // .catch(error => console.error("Error fetching JSON:", error));
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

  // Reference the skill container
  const skillContainer = document.getElementById("skill-container");
    const skills = getSkills();
    skills.forEach((skill) => {
      const skillDiv = document.createElement("div");
      skillDiv.classList.add("skill-box");       
      skillDiv.innerHTML = `<strong>${skill.name}</strong>: ${skill.level}`;
      skillContainer.appendChild(skillDiv);
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