window.addEventListener("load", function () {
    // 🌀 Animación de preloader
    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 600); // coincide con la transición CSS
        }
    }, 2500); // tiempo mínimo visible (en ms)

    // 💬 Generador automático de enlaces WhatsApp
    document.querySelectorAll('.wa-grid').forEach(grid => {
        const num = (grid.getAttribute('data-wa-number') || '').trim();
        if (!/^\d{8,15}$/.test(num)) return; // valida número 8–15 dígitos

        grid.querySelectorAll('.wa-card').forEach(a => {
            const msg = a.getAttribute('data-text') || 'Hola 👋, me gustaría consultar disponibilidad.';
            const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
            a.setAttribute('href', url);
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
            a.setAttribute('aria-label', `Abrir WhatsApp: ${msg}`);
        });
    });

    // ⚙️ Autoscroll suave del carrusel de WhatsApp
    const rail = document.querySelector(".wa-rail");
    if (rail) {
        let scrollDir = 1; // 1 = derecha, -1 = izquierda
        let paused = false;

        function autoScroll() {
            if (paused) return;
            rail.scrollLeft += scrollDir;
            if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) scrollDir = -1;
            else if (rail.scrollLeft <= 0) scrollDir = 1;
        }

        const interval = setInterval(autoScroll, 25); // velocidad (ms)

        // Pausar en interacción
        rail.addEventListener("mouseenter", () => paused = true);
        rail.addEventListener("mouseleave", () => paused = false);
        rail.addEventListener("touchstart", () => paused = true);
        rail.addEventListener("touchend", () => paused = false);
    }
});

// ===== Modal de Tarifas =====

// 1) Datos
const TARIFAS = [
    // Individuales
    { cat: 'individuales', nombre: 'Relajante 1 h', precio: 25, reserva: 15, detalle: 'Sesión completa', msg: 'Quiero reservar Relajante 1 h' },
    { cat: 'individuales', nombre: 'Relajante 30 min', precio: 20, reserva: 10, detalle: 'Medio cuerpo', msg: 'Quiero reservar Relajante 30 min' },
    { cat: 'individuales', nombre: 'Descontracturante 1 h', precio: 25, reserva: 15, detalle: 'Terapéutico', msg: 'Quiero reservar Descontracturante 1 h' },
    { cat: 'individuales', nombre: 'Descontracturante 30 min', precio: 20, reserva: 10, detalle: 'Zona específica', msg: 'Quiero reservar Descontracturante 30 min' },
    { cat: 'individuales', nombre: 'Circulatorio 1 h', precio: 25, reserva: 8, detalle: 'Activación venosa, sesión completa', msg: 'Quiero reservar Circulatorio 1 h' },
    { cat: 'individuales', nombre: 'Circulatorio 30 min', precio: 22, reserva: 10, detalle: 'Medio cuerpo', msg: 'Quiero reservar Circulatorio 30 min' },
    { cat: 'individuales', nombre: 'Deportivo 15 min', precio: 15, reserva: 5, detalle: 'Descarga puntual', msg: 'Quiero reservar Deportivo 15 min' },
    { cat: 'individuales', nombre: 'Deportivo 30 min', precio: 20, reserva: 10, detalle: 'Post-entreno', msg: 'Quiero reservar Deportivo 30 min' },

    // Extras
    { cat: 'extras', nombre: 'Facial', precio: 5, reserva: 5, detalle: 'Añadible', msg: 'Quiero añadir Facial' },
    { cat: 'extras', nombre: 'Pies', precio: 10, reserva: 10, detalle: 'Añadible', msg: 'Quiero añadir Pies' },

    // Cupping
    { cat: 'cupping', nombre: 'Cupping estático 5 min (zona)', precio: 6, reserva: 5, detalle: 'Ventosas', msg: 'Quiero reservar Cupping estático 5 min' },
    { cat: 'cupping', nombre: 'Cupping estático 10 min (zona)', precio: 8, reserva: 5, detalle: 'Ventosas', msg: 'Quiero reservar Cupping estático 10 min' },
    { cat: 'cupping', nombre: 'Cupping estático 15 min (zona)', precio: 10, reserva: 5, detalle: 'Ventosas', msg: 'Quiero reservar Cupping estático 15 min' },
    { cat: 'cupping', nombre: 'Cupping dinámico 5 min (zona)', precio: 8, reserva: 5, detalle: 'Deslizamiento de ventosas', msg: 'Quiero reservar Cupping dinámico 5 min' },

    // Electroterapia
    { cat: 'electro', nombre: 'Electroterapia 5 min (zona)', precio: 6, reserva: 4, detalle: 'Refuerzo localizado', msg: 'Quiero reservar Electroterapia 5 min (zona)' },
    { cat: 'electro', nombre: 'Electroterapia 30 min (cuerpo completo)', precio: 25, reserva: 10, detalle: 'Global', msg: 'Quiero reservar Electroterapia 30 min' },
    { cat: 'electro', nombre: 'Electroterapia 1 h (cuerpo completo)', precio: 30, reserva: 10, detalle: 'Global', msg: 'Quiero reservar Electroterapia 1 h' },

    // Packs & Bonos
    { cat: 'packs', nombre: 'Pack Bienestar Básico 15 min (Rel + Desc)', precio: 10, reserva: 5, detalle: '', msg: 'Quiero reservar Pack Básico 15 min' },
    { cat: 'packs', nombre: 'Pack Bienestar Básico 30 min (Rel + Desc)', precio: 18, reserva: 10, detalle: '', msg: 'Quiero reservar Pack Básico 30 min' },
    { cat: 'packs', nombre: 'Pack Bienestar Básico 1 h (Rel + Desc)', precio: 20, reserva: 15, detalle: '', msg: 'Quiero reservar Pack Básico 1 h' },
    { cat: 'packs', nombre: 'Pack Bienestar Mejorado 30 min (Rel + Desc + Circ)', precio: 25, reserva: 15, detalle: '', msg: 'Quiero reservar Pack Mejorado 30 min' },
    { cat: 'packs', nombre: 'Pack Bienestar Mejorado 1 h (Rel + Desc + Circ)', precio: 30, reserva: 15, detalle: '', msg: 'Quiero reservar Pack Mejorado 1 h' },
    { cat: 'packs', nombre: 'Pack Bienestar Premium 30 min (todo menos dep.)', precio: 35, reserva: 20, detalle: '', msg: 'Quiero reservar Pack Premium 30 min' },
    { cat: 'packs', nombre: 'Pack Bienestar Premium 1 h (todo menos dep.)', precio: 40, reserva: 20, detalle: '', msg: 'Quiero reservar Pack Premium 1 h' },
    { cat: 'packs', nombre: 'Bono Relax Express (3 Relajantes x 30 min)', precio: 52, reserva: 10, detalle: '', msg: 'Quiero reservar Bono Relax Express' },
    { cat: 'packs', nombre: 'Bono Recuperación Total (3 Desc x 1 h)', precio: 70, reserva: 15, detalle: '', msg: 'Quiero reservar Bono Recuperación Total' },
    { cat: 'packs', nombre: 'Bono Zen Mensual (4 Rel/Circ x 1 h) + Facial 10 min', precio: 90, reserva: 15, detalle: '', msg: 'Quiero reservar Bono Zen Mensual' },
    { cat: 'packs', nombre: 'Bono Equilibrio 2+2 (2×1 h + 2×30 min)', precio: 70, reserva: 15, detalle: '', msg: 'Quiero reservar Bono Equilibrio 2+2' },
    { cat: 'packs', nombre: 'Pack Dúo (2 masajes de 1 h, mismo día)', precio: 45, reserva: 15, detalle: 'Pareja o amigos', msg: 'Quiero reservar Pack Dúo' }
];

// 2) Estado y utilidades
const elModal = document.getElementById('tarifasModal');
const tGrid = document.getElementById('tGrid');
const tSearch = document.getElementById('tSearch');
const tTabs = document.querySelectorAll('.ttab');
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
const tPageInfo = document.getElementById('tPageInfo');
const PAGE_SIZE = 9;
let state = { cat: 'individuales', q: '', page: 1, filtered: [] };

function getNumberFrom(el) {
    const num = (el.getAttribute('data-wa-number') || '').trim();
    return /^\d{8,15}$/.test(num) ? num : '';
}

function filterData() {
    const q = (state.q || '').toLowerCase().trim();

    // Si hay búsqueda, no filtro por pestaña: busco en TODAS las categorías
    const base = q
        ? TARIFAS
        : TARIFAS.filter(i => i.cat === state.cat);

    const data = base.filter(i =>
        !q ||
        i.nombre.toLowerCase().includes(q) ||
        (i.detalle || '').toLowerCase().includes(q) ||
        (i.cat || '').toLowerCase().includes(q) // permite buscar por "packs", "extras", etc.
    );

    state.filtered = data;
    state.page = 1;
}

function catLabel(cat) {
    switch (cat) {
        case 'individuales': return 'Individuales';
        case 'cupping': return 'Cupping';
        case 'electro': return 'Electroterapia';
        case 'extras': return 'Extras';
        case 'packs': return 'Packs & Bonos';
        default: return cat || '';
    }
}


function render() {
    const start = (state.page - 1) * PAGE_SIZE;
    const slice = state.filtered.slice(start, start + PAGE_SIZE);
    const num = getNumberFrom(elModal);
    tGrid.innerHTML = slice.map(i => {
        const msg = `Hola, ${i.msg}. Reserva: ${i.reserva}€`;
        const href = num ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}` : '#';
        return `
  <div class="tcard">
    <div>
      <div class="tname">${i.nombre}</div>
      <div class="tmeta">
        ${state.q ? `<strong style="color:#ffd700">${catLabel(i.cat)}</strong>${i.detalle ? ' · ' : ''}` : ''}
        ${i.detalle || ''}
      </div>
    </div>
    <div class="tcta">
      <span class="tbadge">Reserva ${i.reserva}€</span><br>
      <span class="tprice">${i.precio} €</span><br>
      <a class="btn-consulta" href="${href}" target="_blank" rel="noopener"
         aria-label="Reservar ${i.nombre} por WhatsApp">Reservar</a>
    </div>
  </div>`;

    }).join('');

    const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
    tPrev.disabled = state.page <= 1;
    tNext.disabled = state.page >= pages;
    tPageInfo.textContent = `${state.page} / ${pages}`;
}

// 3) Eventos de UI
document.getElementById('openTarifas').addEventListener('click', (e) => {
    e.preventDefault();
    filterData(); render();
    elModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

elModal.addEventListener('click', (e) => {
    if (e.target.dataset.close) { elModal.classList.remove('show'); document.body.style.overflow = ''; }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elModal.classList.contains('show')) {
        elModal.classList.remove('show'); document.body.style.overflow = '';
    }
});

tTabs.forEach(btn => {
    btn.addEventListener('click', () => {
        tTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.cat = btn.dataset.cat; state.q = ''; tSearch.value = '';
        filterData(); render();
    });
});

let tSearchTimer;
tSearch.addEventListener('input', () => {
    clearTimeout(tSearchTimer);
    tSearchTimer = setTimeout(() => {
        state.q = tSearch.value.trim();
        filterData(); render();
    }, 150);
});

tPrev.addEventListener('click', () => { if (state.page > 1) { state.page--; render(); } });
tNext.addEventListener('click', () => {
    const pages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
    if (state.page < pages) { state.page++; render(); }
});
