/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function setTopnavMode() {
	let x = document.getElementById("myTopnav");
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
		wrapper.scrollBy({left: -scrollAmount, behavior: 'smooth'});
	} else {
		wrapper.scrollBy({left: scrollAmount, behavior: 'smooth'});
	}
}

async function getSkills() {
	console.log("Fetching skills");
	const response = await fetch("skills.json");
	if (!response.ok) {
		throw new Error("Error fetching JSON");
	}
	return response.json();
}

// Reference the skill container
const skillContainer = document.querySelector("#skill-container");
getSkills().then((skills) => {
	skills.forEach((skill) => {

		const skillDiv = document.createElement("div");
		skillDiv.classList.add("skill-box");
		skillDiv.classList.add("tooltip");
		skillDiv.setAttribute("data-tooltip", skill.name + " - " + skill.level);

		skillDiv.innerHTML = `<img src=${skill.icon} alt=${skill.name} class="skill-icon">`
		// skillDiv.innerHTML += `<strong>${skill.name}</strong>`;
		skillContainer.appendChild(skillDiv);

	});
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
