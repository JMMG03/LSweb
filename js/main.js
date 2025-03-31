document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const radialMenu = document.getElementById('radialMenu');
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const profesionText = document.getElementById('profesion');

    let isMenuOpen = false;

    // Mostrar menú radial
    const showRadialMenu = () => {
        radialMenu.classList.add('show');
        isMenuOpen = true;
    };

    // Ocultar menú radial
    const hideRadialMenu = () => {
        radialMenu.classList.remove('show');
        isMenuOpen = false;
    };

    // Eventos para mostrar el menú al mantener presionado
    mainBtn.addEventListener('mousedown', showRadialMenu);
    mainBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showRadialMenu();
    });

    // Evento para ocultar el menú si no se selecciona nada
    document.addEventListener('mouseup', (e) => {
        if (isMenuOpen && !e.target.classList.contains('option')) {
            hideRadialMenu();
        }
    });

    // Función para manejar la selección
    const selectOption = (option, text) => {
        profesionText.textContent = text;
        hideRadialMenu();

        // Resetear selección
        option1.classList.remove('selected');
        option2.classList.remove('selected');

        // Resaltar opción seleccionada
        option.classList.add('selected');
    };

    option1.addEventListener('click', () => selectOption(option1, "Desarrollador de Aplicaciones"));
    option2.addEventListener('click', () => selectOption(option2, "Quiromasajista Profesional"));
});
