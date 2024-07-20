// Create a class for the element
class Project extends HTMLElement {
	// static observedAttributes = ["name", "link", "image", "tags", "description"];
  
	constructor() {
		// Always call super first in constructor
		super();
	}
  
	connectedCallback() {
		// console.log("Custom element added to page.");
		let name = this.getAttribute("name");
		let link = this.getAttribute("link");
		let image = this.getAttribute("image");
		let tags = JSON.parse(this.getAttribute("tags"));
		let description = this.getAttribute("description");

		let project = this.querySelector("div")
		project.setAttribute("class", "project");

		let imageLink = document.createElement("a");
		imageLink.setAttribute("href", link);
		if (link.startsWith("http")) {
			imageLink.setAttribute("target", "_blank");
		}

		let imageElement = document.createElement("img");
		imageElement.setAttribute("src", image);

		imageLink.appendChild(imageElement);

		project.appendChild(imageLink);

		let content = document.createElement("div");
		let titleLink = document.createElement("a");
		titleLink.setAttribute("href", link);
		if (link.startsWith("http")) {
			titleLink.setAttribute("target", "_blank");
		}

		let title = document.createElement("h2");
		title.innerHTML = name + " <span class=\"fas fa-external-link-alt\"/>";
		titleLink.appendChild(title);

		content.appendChild(titleLink);

		let descriptionElemenet = document.createElement("p");
		descriptionElemenet.innerHTML = description;

		content.appendChild(descriptionElemenet);
		project.appendChild(content);
	}
  
	// disconnectedCallback() {
	//   console.log("Custom element removed from page.");
	// }
  
	// adoptedCallback() {
	//   console.log("Custom element moved to new page.");
	// }
  
	// attributeChangedCallback(name, oldValue, newValue) {
	//   console.log(`Attribute ${name} has changed.`);
	// }
  }

  customElements.define("project-item", Project);
