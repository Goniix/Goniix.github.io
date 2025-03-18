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


document.addEventListener("DOMContentLoaded", (event) => {
	const links = document.querySelectorAll("a[href*='#']");
	links.forEach(link => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const href = link.attributes.getNamedItem("href").value;
			console.log(href);
			const target = document.querySelector(href);

			if (!target) return;

			const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 150;
			const startPosition = window.pageYOffset;
			const distance = targetPosition - startPosition;
			const duration = 500;
			let startTime = null;

			function animation(currentTime) {
				if (!startTime) startTime = currentTime;
				const timeElapsed = currentTime - startTime;
				const progress = Math.min(timeElapsed / duration, 1);

				// Swing easing function (approximates jQuery's swing)
				const swingProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

				window.scrollTo(0, startPosition + (distance * swingProgress));

				if (timeElapsed < duration) {
					requestAnimationFrame(animation);
				}
			}

			requestAnimationFrame(animation);
		})
	});
});

function updateActiveNav() {
	const sections = document.querySelectorAll('section');
	const scrollTop = window.scrollY;
	const navLinks = document.querySelectorAll('.topnav a');

	sections.forEach(section => {
		const height = section.offsetHeight;
		const offset = section.getBoundingClientRect().top + window.scrollY - 500;
		const id = section.getAttribute('id');

		if (id && scrollTop > offset && scrollTop < offset + height) {
			// Remove active class from all links
			navLinks.forEach(link => link.classList.remove('active'));

			// Find matching link and add active class
			const matchingLink = document.querySelector(`.topnav a[href="#${id}"]`);
			if (matchingLink) {
				matchingLink.classList.add('active');
			}
		}
	});
}

// Event listeners for scroll and load
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);