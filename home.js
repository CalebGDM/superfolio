document.addEventListener("DOMContentLoaded", function () {
  const projectHomeContainer = document.getElementById("project-home-container");
  const habilitesContainer = document.getElementById("habilites-container");
  getData().then(data => {
    populateProjectsHome(data, projectHomeContainer);
    populateHabilities(data, habilitesContainer);
  });

  
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


const populateProjectsHome = (data, container) => {
  data.projects
    .slice(Math.max(data.projects.length - 3, 0))
    .forEach((project) => {
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
      container.appendChild(card);
    });
};


const populateHabilities = (data, container) => {
  data.habilities.forEach((hability) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = ` <img
              src="${hability.image}"
              alt="${hability.name}"
              class="img-fluid mb-3"
            />
            <h3>${hability.name}</h3>
            <p>${hability.description}</p>`;
    container.appendChild(card);
  });
};
