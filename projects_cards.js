fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        const projectContainer = document.getElementById("project-container");
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
            projectContainer.appendChild(card);
        });
    });