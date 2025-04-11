const toggleBtn = document.getElementById("toggleBtn");
const cardContainer = document.getElementById("cardContainer");
let showingMore = false;

const extraCards = [
  {
    title: "Pies y Reflexología",
    img: "https://via.placeholder.com/400x200?text=Reflexología",
    desc: "Masaje en pies para activar órganos y mejorar circulación.",
    price: "30€"
  },
  {
    title: "Masaje con Piedras Calientes",
    img: "https://via.placeholder.com/400x200?text=Piedras+Calientes",
    desc: "Relajación profunda con piedras volcánicas.",
    price: "45€"
  }
];

toggleBtn.addEventListener("click", () => {
  if (!showingMore) {
    extraCards.forEach(card => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-lg-4 extra-card";
      col.innerHTML = `
        <div class="card service-card">
          <div class="glow-border">
            <img src="${card.img}" class="card-img-top" alt="${card.title}">
            <div class="card-body">
              <h5>${card.title}</h5>
              <p>${card.desc}</p>
              <span class="price">${card.price}</span>
            </div>
          </div>
        </div>
      `;
      cardContainer.appendChild(col);
    });
    toggleBtn.innerText = "Mostrar menos";
  } else {
    document.querySelectorAll(".extra-card").forEach(el => el.remove());
    toggleBtn.innerText = "Mostrar más";
  }
  showingMore = !showingMore;
});
