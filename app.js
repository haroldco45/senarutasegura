const routeData = {
    stops: [
        "Frente al cementerio Camello", "Frente al Éxito", "Entrada UdeA",
        "Corazón de Jesús", "Frente del semáforo la 10", "Ara Asovivienda",
        "Bahía Coliseo", "Entrada a Villa Arabia", "Ara Las Malvinas", "Hacienda La Uribe"
    ],
    schedule: ["06:00", "11:30", "17:30"]
};

function initApp() {
    const container = document.getElementById('stops-container');
    
    // Renderizar paradas
    routeData.stops.forEach((stop, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${index + 1}.</strong> &nbsp; ${stop}`;
        container.appendChild(li);
    });

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    let nextBus = null;

    for (let time of routeData.schedule) {
        const [hrs, mins] = time.split(':');
        const busTime = new Date();
        busTime.setHours(hrs, mins, 0);

        if (busTime > now) {
            nextBus = busTime;
            break;
        }
    }

    const display = document.getElementById('countdown');
    if (!nextBus) {
        display.innerText = "Fin del servicio";
        return;
    }

    const diff = nextBus - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    display.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', initApp);
