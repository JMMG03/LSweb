document.addEventListener("DOMContentLoaded", function () {
    const mainBtn = document.getElementById("mainBtn");
    const radialMenu = document.getElementById("radialMenu");
    const options = document.querySelectorAll(".option");

    // Función para mostrar u ocultar el menú
    function toggleMenu(show) {
        if (show) {
            radialMenu.style.display = "flex";
            setTimeout(() => radialMenu.classList.add("show"), 10);
            mainBtn.classList.add("hidden");
        } else {
            radialMenu.classList.remove("show");
            setTimeout(() => (radialMenu.style.display = "none"), 300);
            mainBtn.classList.remove("hidden");
        }
    }

    // Evento para mostrar el menú al hacer clic en el botón
    mainBtn.addEventListener("click", function () {
        toggleMenu(true);
    });

    // Evento para redirigir a la página seleccionada
    options.forEach(option => {
        option.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-target");
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    // Evento para cerrar el menú si se hace clic fuera de él
    //x
    document.addEventListener("click", function (event) {
        if (!radialMenu.contains(event.target) && !mainBtn.contains(event.target)) {
            toggleMenu(false);
        }
    });
});
