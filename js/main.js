document.addEventListener("DOMContentLoaded", () => {
    const mainBtn = document.getElementById("mainBtn");
    const radialMenu = document.getElementById("radialMenu");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");

    let isMenuOpen = false;

    // Función para mostrar el menú radial
    const showRadialMenu = () => {
        radialMenu.style.display = "flex"; // Asegurarse de que el menú sea visible
        setTimeout(() => {
            radialMenu.classList.add("show");
        }, 10); // Pequeño delay para que la transición funcione
        isMenuOpen = true;
    };

    // Función para ocultar el menú radial
    const hideRadialMenu = () => {
        radialMenu.classList.remove("show");
        setTimeout(() => {
            if (!isMenuOpen) radialMenu.style.display = "none"; // Ocultarlo después de la animación
        }, 300);
        isMenuOpen = false;
    };

    // Evento para mostrar el menú al presionar el botón
    mainBtn.addEventListener("mousedown", () => {
        if (!isMenuOpen) {
            showRadialMenu();
        }
    });

    mainBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (!isMenuOpen) {
            showRadialMenu();
        }
    });

    // Evento para ocultar el menú si se toca fuera
    document.addEventListener("mouseup", (e) => {
        if (isMenuOpen && !e.target.closest("#radialMenu") && e.target !== mainBtn) {
            hideRadialMenu();
        }
    });

    document.addEventListener("touchend", (e) => {
        if (isMenuOpen && !e.target.closest("#radialMenu") && e.target !== mainBtn) {
            hideRadialMenu();
        }
    });

    // Función para redirigir a la página correspondiente
    const redirectToPage = (url) => {
        window.location.href = url;
    };

    // Eventos de selección de opciones
    option1.addEventListener("click", () => redirectToPage("developer.html"));
    option2.addEventListener("click", () => redirectToPage("quiromasaje.html"));

    option1.addEventListener("touchend", (e) => {
        e.preventDefault();
        redirectToPage("developer.html");
    });

    option2.addEventListener("touchend", (e) => {
        e.preventDefault();
        redirectToPage("quiromasaje.html");
    });
});
