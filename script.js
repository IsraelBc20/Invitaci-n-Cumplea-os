// Configuración del evento
const eventDate = new Date('2025-08-17T17:00:00'); // Domingo 17 de agosto a las 5:00 PM

// Coordenadas para Google Maps
const latitude = -11.4895085;
const longitude = -77.2063351;

// Función para actualizar el conteo regresivo
function updateCountdown() {
    const now = new Date().getTime();
    const eventTime = eventDate.getTime();
    const timeLeft = eventTime - now;

    // Si el evento ya pasó
    if (timeLeft < 0) {
        document.getElementById('countdown').innerHTML = `
            <div class="time-unit">
                <span class="number">🎉</span>
                <span class="label">¡Ya es hora!</span>
            </div>
        `;
        return;
    }

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Actualizar los elementos del DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Función para abrir Google Maps
function openGoogleMaps() {
    // Crear URL de Google Maps con las coordenadas
    const mapsUrl = `https://www.google.com/maps/place/Cl%C3%ADnica+Veterinaria+Kusi+Pet/@-11.4895032,-77.20891,17z/data=!3m1!4b1!4m6!3m5!1s0x91068bd5b7601029:0xb2b802d18030b262!8m2!3d-11.4895085!4d-77.2063351!16s%2Fg%2F11v15t8hxl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D`;
    
    // Abrir en una nueva ventana/pestaña
    window.open(mapsUrl, '_blank');
}

// Función para manejar efectos de sonido
// Declarar la variable de audio fuera de la función
let honeyAudio = new Audio('Audio%20para%20draguito.mp3');
honeyAudio.volume = 0.9;

function playHoneySound() {
    // Si está sonando, reiniciamos desde el inicio
    honeyAudio.pause();
    honeyAudio.currentTime = 0;
    honeyAudio.play().catch(e => console.log('Audio no disponible', e));
}


// Función para agregar efectos de partículas de hojas de otoño
function createAutumnLeaves() {
    const container = document.querySelector('.invitation-card');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const leaves = ['🍂', '🍁'];
            particle.innerHTML = leaves[Math.floor(Math.random() * leaves.length)];
            particle.style.position = 'absolute';
            particle.style.fontSize = '20px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '-50px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '50';
            particle.style.animation = 'leafFallDown 4s linear forwards';
            
            container.appendChild(particle);
            
            // Remover la partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4000);
        }, i * 800);
    }
}

// Agregar animación CSS para las partículas de hojas
const style = document.createElement('style');
style.textContent = `
    @keyframes leafFallDown {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Función principal para revelar la invitación
function revealInvitation() {
    const initialScreen = document.getElementById('initialScreen');
    const invitationCard = document.getElementById('invitationCard');
    
    // Deslizar la pantalla inicial hacia abajo
    initialScreen.classList.add('slide-down');
    
    // Mostrar la tarjeta de invitación con un pequeño retraso
    setTimeout(() => {
        invitationCard.classList.add('show');
        
        // Crear hojas de otoño después de mostrar la invitación
        setTimeout(createAutumnLeaves, 1000);
        
        // Iniciar efecto periódico de hojas
        startAutumnLeafEffect();
    }, 500);
}

// Función de inicialización
function init() {
    // Actualizar el conteo regresivo inmediatamente
    updateCountdown();
    
    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    
    // Agregar event listener al botón especial inicial
    const specialButton = document.getElementById('specialButton');
    specialButton.addEventListener('click', () => {
        playHoneySound();
        revealInvitation();
    });
    
    // Agregar event listener al botón de ubicación
    const locationButton = document.getElementById('locationButton');
    locationButton.addEventListener('click', () => {
        playHoneySound();
        openGoogleMaps();
    });
    
    // Agregar efectos de hover a elementos interactivos
    const interactiveElements = document.querySelectorAll('.time-unit, .location-button, .special-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('special-button')) {
                element.style.transform = 'scale(1.05)';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('special-button')) {
                element.style.transform = 'scale(1)';
            }
        });
    });
}

// Función para crear hojas de otoño periódicamente después de mostrar la invitación
function startAutumnLeafEffect() {
    // Crear hojas de otoño cada 15 segundos
    setInterval(createAutumnLeaves, 15000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Manejar cambios de visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateCountdown();
    }
});

// Función para detectar dispositivos móviles
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustes específicos para móviles
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', () => {
        // Prevenir zoom en inputs (aunque no tenemos inputs, es buena práctica)
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Agregar clase para estilos específicos de móvil
        document.body.classList.add('mobile');
    });
}

// Agregar funcionalidad de teclado para accesibilidad
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('location-button')) {
            event.preventDefault();
            openGoogleMaps();
        }
        if (focusedElement.classList.contains('special-button')) {
            event.preventDefault();
            revealInvitation();
        }
    }
});

console.log('🍯 Invitación de cumpleaños cargada correctamente! 🐻');

