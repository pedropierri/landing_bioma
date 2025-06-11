document.addEventListener('DOMContentLoaded', function() {
    // --- Código do Menu Hambúrguer e Header Scroll (já existentes) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.getElementById('main-header');

    hamburgerMenu.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Impede o scroll em mobile
        } else {
            document.body.style.overflow = '';
        }
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restaura o scroll
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

    // --- Efeito de Digitação e Apagamento para o H1 ---
    const h1Element = document.querySelector('#hero h1'); // Seleciona o H1 do Hero
    const words = [ // Sua lista de palavras
        "IMMERSE.",
        "CONNECT.",
        "EVOLVE.",
        "NIGHT.",
        "PULSE.",
        "SYSTEM."
    ];

    let wordIndex = 0; // Índice da palavra atual no array
    let charIndex = 0; // Índice do caractere atual da palavra
    let isDeleting = false; // Flag para saber se está digitando ou apagando
    const typingSpeed = 150; // Velocidade de digitação (ms por caractere)
    const deletingSpeed = 100; // Velocidade de apagamento (ms por caractere)
    const pauseBeforeNext = 1500; // Tempo de pausa antes de apagar ou digitar a próxima palavra

    function typeWriterEffect() {
        // Sai da função se o elemento h1 não for encontrado (evita erros)
        if (!h1Element) {
            console.warn("Elemento h1 para o efeito de digitação não encontrado.");
            return;
        }

        const currentWord = words[wordIndex];
        let displayText = '';

        if (isDeleting) {
            // Se estiver apagando, remove um caractere
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Se estiver digitando, adiciona um caractere
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Atualiza o texto visível no h1
        h1Element.textContent = displayText;

        let speed = isDeleting ? deletingSpeed : typingSpeed; // Define a velocidade base

        // Lógica de transição entre digitar e apagar
        if (!isDeleting && charIndex === currentWord.length) {
            // Terminou de digitar a palavra atual
            speed = pauseBeforeNext; // Pausa antes de apagar
            isDeleting = true; // Muda para o modo de apagar
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar a palavra atual
            isDeleting = false; // Muda para o modo de digitar
            wordIndex = (wordIndex + 1) % words.length; // Avança para a próxima palavra (loop)
            speed = typingSpeed; // Reinicia a velocidade de digitação
        }

        // Chama a função novamente após o tempo definido
        setTimeout(typeWriterEffect, speed);
    }

    // Inicia o efeito após um pequeno atraso (1 segundo)
    setTimeout(typeWriterEffect, 1000);
});