document.addEventListener("DOMContentLoaded", function () {
  const projectModal = document.getElementById("projectModal");

  projectModal.addEventListener("show.bs.modal", function (event) {
    const card = event.relatedTarget;

    // Obtener los datos del proyecto desde los atributos data
    const id = card.getAttribute("data-project-id");

    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        const project = data.projects.find((proj) => proj.id == id);
        if (project) {
          populateModal(project);
        }
      });
  });
});

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
