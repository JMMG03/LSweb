const toggleBtn = document.getElementById("toggleBtn");
const cardContainer = document.getElementById("cardContainer");
let showingMore = false;

const extraCards = [
  {
    title: "Pies y Reflexología",
    img: "https://via.placeholder.com/400x200?text=Reflexología",
    desc: "Masaje en pies para activar órganos y mejorar circulación.",
    price: "20€"
  },
  {
    title: "Masaje Deportivo",
    img: "https://via.placeholder.com/400x200?text=Piedras+Calientes",
    desc: "Puede ser relajante u orientado a potenciar el rendimiento deportivo.",
    price: "20€ / media hora"
  },
  {
    title: "Drenaje Linfático",
    img: "https://via.placeholder.com/400x200?text=Piedras+Calientes",
    desc: "Estimular el sistema linfático para optimizar el flujo de la linfa, encargada de transportar nutrientes y eliminar desechos.",
    price: "25€"
  },
  {
    title: "Otras terapias",
    img: "https://via.placeholder.com/400x200?text=Piedras+Calientes",
    desc: "- Electroterapia<br>- Cupping<br> # Consultar.",
    price: "?€"
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
