document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.getElementById('main-header');

    hamburgerMenu.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        header.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const h1Element = document.querySelector('#hero h1');
    const words = [
        "IMMERSE.",
        "CONNECT.",
        "EVOLVE.",
        "NIGHT.",
        "PULSE.",
        "SYSTEM."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseBeforeNext = 1500;

    function typeWriterEffect() {
        if (!h1Element) {
            console.warn("Elemento h1 para o efeito de digitação não encontrado.");
            return;
        }

        const currentWord = words[wordIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        h1Element.textContent = displayText;

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = pauseBeforeNext;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) { 
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = typingSpeed;
        }
        setTimeout(typeWriterEffect, speed);
    }

    setTimeout(typeWriterEffect, 850);

    const heroVideo = document.querySelector('.video-background video');

    if (heroVideo) {

    heroVideo.play().catch(error => {
        console.warn("Autoplay do vídeo foi bloqueado pelo navegador. Isso é esperado em alguns celulares.", error);
    });
}
});