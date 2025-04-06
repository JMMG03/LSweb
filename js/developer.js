document.addEventListener("DOMContentLoaded", function () {
    const projects = [
      {
        title: "ClickerFast",
        image: "https://via.placeholder.com/300x180?text=ClickerFast",
        link: "https://github.com/usuario/clickerfast"
      },
      {
        title: "App Quiromasaje",
        image: "https://via.placeholder.com/300x180?text=Quiromasaje+App",
        link: "https://github.com/usuario/quiromasaje-app"
      },
      {
        title: "Game 2D con Photon",
        image: "https://via.placeholder.com/300x180?text=2D+Multiplayer",
        link: "https://github.com/usuario/unity-2d-multiplayer"
      }
    ];
  
    const container = document.getElementById("projectsContainer");
  
    projects.forEach((project, index) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "project-card");
  
      card.innerHTML = `
        <img src="${project.image}" class="project-img" alt="${project.title}">
        <div class="project-body">
          <h5>${project.title}</h5>
          <a href="${project.link}" target="_blank" class="github-btn">➡</a>
        </div>
      `;
      container.appendChild(card);
    });
  
    // Animación al hacer scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
  
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => observer.observe(card));
  });
  