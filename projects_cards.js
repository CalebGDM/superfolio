fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    if (projectContainer) {
      console.log(data);
      showProjects(data);
    } else {
      showProjectsHome(data);
    }
  });

const projectHomeContainer = document.getElementById("project-home-container");
const showProjectsHome = (data) => {
  data.projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
              <a href="projects.html" class="text-decoration-none text-dark card h-100">
                <img src="${project.image}" class="card-img-top" alt="${project.title}" />
                <div class="p-3">
                  <h3 class="fs-4">${project.title}</h3>
                  <p>${project.shortDescription}</p>
                </div>
              </a>
            `;
    projectHomeContainer.appendChild(card);
  });
};

const projectContainer = document.getElementById("project-container");
const showProjects = (data) => {
  data.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "col";
    card.innerHTML = `
              <div 
                class="text-decoration-none text-dark card h-100 project-card"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                data-project-id="${project.id}"
              
              >
                <img src="${project.image}" class="card-img-top" alt="${project.title}" />
                <div class="p-3">
                  <h3 class="fs-4">${project.title}</h3>
                  <p>${project.shortDescription}</p>
                </div>
              </div>
            `;
    projectContainer.appendChild(card);
  });
};
