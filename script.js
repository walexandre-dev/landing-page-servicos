const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    // Alterna a classe 'active' para mostrar/esconder menu
    navLinks.classList.toggle('active');
    
    // Alterna o ícone entre Menu e X (Opcional, lógica visual)
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        icon.classList.replace('ph-x', 'ph-list');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.replace('ph-x', 'ph-list');
    });
});

/* --- Lógica do Carrossel --- */
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

// Pega a largura do slide
const slideWidth = slides[0].getBoundingClientRect().width;

// Arranjar os slides um ao lado do outro
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Função para mover o track
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Atualizar bolinhas
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// Botão NEXT
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;

    // Loop infinito: se não houver próximo, volta para o primeiro
    if (!nextSlide) {
        nextSlide = slides[0];
        nextDot = dots[0];
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

// Botão PREV
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    // Loop infinito: se não houver anterior, vai para o último
    if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
        prevDot = dots[dots.length - 1];
    }

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

// Autoplay (Passar sozinho)
let autoPlayInterval;

const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
        nextButton.click(); // Simula um clique no botão "próximo"
    }, 4000); // Muda a cada 4 segundos
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

// Iniciar Autoplay
startAutoPlay();

// Pausar quando o mouse entra no carrossel, Retomar quando sai
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// Clique nas bolinhas
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});