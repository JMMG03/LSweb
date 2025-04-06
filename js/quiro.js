
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
        extraCards.forEach((card, i) => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-lg-4 extra-card";
            col.innerHTML = `
            <div class="card service-card position-relative" data-id="extra${i}">
              <img src="${card.img}" class="card-img-top" alt="${card.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${card.title}</h5>
              </div>
              <div class="popup">
                ${card.desc}<br><strong>Precio:</strong> ${card.price}<br><small>Sujeto a cambios</small>
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

// Mostrar pop-up al hacer click en tarjeta
document.addEventListener("click", e => {
    const targetCard = e.target.closest(".service-card");
    document.querySelectorAll(".popup").forEach(p => (p.style.display = "none"));
    if (targetCard) {
        const popup = targetCard.querySelector(".popup");
        popup.style.display = "block";
    }
});