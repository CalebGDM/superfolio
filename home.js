document.addEventListener("DOMContentLoaded", function () {
  const projectHomeContainer = document.getElementById("project-home-container");
  const habilitesContainer = document.getElementById("habilites-container");
  getData().then(data => {
    populateProjectsHome(data, projectHomeContainer);
    populateHabilities(data, habilitesContainer);
    populateLastDiaryEntry(data.diaryEntries[data.diaryEntries.length - 1]);
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
              <a href="projects.html?modal=${project.id}" class="text-decoration-none text-dark card h-100">
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

const populateLastDiaryEntry = (data) => {
  const lastEntryContainer = document.getElementById("last-diary-entry");
  
  lastEntryContainer.innerHTML = `<div
            class="card-body d-flex flex-column justify-content-center mt-4 mt-md-0 w-100 w-md-50"
          >
            <h4 class="fs-6 text-warning text-uppercase">
             ${data.mood}
            </h4>
            <h3 class="fw-bold">${data.title}</h3>
            <p>
              ${data.content.slice(0, 150)}...
            </p>
            <a href="diary.html" class="btn btn-warning">Leer más</a>
          </div>
          <!-- Imagen -->
          <div class="w-100 w-md-50">
            <img
              src="${data.image}"
              alt="Imagen de la entrada"
              class="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>`;
};