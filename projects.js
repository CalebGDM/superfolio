document.addEventListener("DOMContentLoaded", function () {
  const projectModal = document.getElementById("projectModal");
  const projectContainer = document.getElementById("project-container");
  const futureProjectContainer = document.getElementById("future-project-container");
  const urlParams = new URLSearchParams(window.location.search);
  const modalId = urlParams.get('modal');
  console.log(modalId);
  
  getData().then(data => {
    populateProjectCards(data, projectContainer);
    populateFutureProjects(data, futureProjectContainer);
  });

  projectModal.addEventListener("show.bs.modal", function (event) {
    const card = event.relatedTarget;
    const id = card.getAttribute("data-project-id");
    
    getData().then((data) => {
      const project = data.projects.find((proj) => proj.id == id);
      if (project) {
        populateModal(project);
      }
    });
  });
  if (modalId) {
    const modal = new bootstrap.Modal(projectModal);
    getData().then((data) => {
      const project = data.projects.find((proj) => proj.id == modalId);
      if (project) {
        populateModal(project);
        modal.show();
      }
    });
  }
});

let cachedData = null;

const getData = () => {
  if (cachedData) return Promise.resolve(cachedData);
  
  return fetch("data.json")
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      cachedData = data;
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      return { projects: [] };
    });
};

const populateModal = (project) => {
  // Actualizar el contenido del modal
  document.getElementById("modalProjectTitle").textContent = project.title;
  document.getElementById("modalProjectDescription").textContent =
    project.longDescription;
  document.getElementById("modalProjectImage").src = project.image;
  document.getElementById("modalProjectDate").textContent = project.date;
  document.getElementById("modalProjectStatus").textContent = project.status;

  // Tecnologías
  const techContainer = document.getElementById("modalProjectTech");
  techContainer.innerHTML = "";
  project.technologies.forEach((technology) => {
    const badge = document.createElement("span");
    badge.classList.add("badge", "bg-primary", "tech-badge");
    badge.textContent = technology;
    techContainer.appendChild(badge);
  });

  // Características
  const featuresList = document.getElementById("modalProjectFeatures");
  featuresList.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });
};

const populateProjectCards = (data, projectContainer) => {
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

const populateFutureProjects = (data, container) => {
  data.futureProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "col";
    card.innerHTML = `
              <div 
                class="text-decoration-none col"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                data-project-id="${project.id}"
              >
                <img src="${project.image}" class="card-img-top" alt="${project.title}" />
                <div class="p-3">
                  <h3 class="fs-4">${project.title}</h3>
                  <p>${project.description}</p>
                </div>
              </div>
            `;
    container.appendChild(card);
  });
};
