const toggleBtn = document.getElementById('toggleBtn');
    const extraCards = document.getElementById('extraCards');

    toggleBtn.addEventListener('click', () => {
      extraCards.classList.toggle('d-none');
      toggleBtn.textContent = extraCards.classList.contains('d-none') ? 'Mostrar más' : 'Mostrar menos';
    });

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function () {
        // Elimina cualquier popup anterior
        document.querySelectorAll('.popup').forEach(p => p.remove());

        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
          <strong>${this.dataset.title}</strong><br>
          ${this.dataset.desc}<br><br>
          <strong>Precio: ${this.dataset.price}</strong>
          <small>Sujeto a cambios</small>
        `;

        this.appendChild(popup);
      });
    });

    // Cerrar el popup al hacer clic fuera
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.card')) {
        document.querySelectorAll('.popup').forEach(p => p.remove());
      }
    });