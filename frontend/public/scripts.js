document.addEventListener('DOMContentLoaded', function() {
    var headers = document.querySelectorAll('.accordion-header');
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var isOpen = header.classList.contains('open');
            headers.forEach(function(h) {
                h.classList.remove('open');
                h.querySelector('.plus-minus').textContent = '+';
                h.nextElementSibling.style.display = 'none';
            });
            if (!isOpen) {
                header.classList.add('open');
                header.querySelector('.plus-minus').textContent = '–';
                header.nextElementSibling.style.display = 'block';
            }
        });
    });

    // Scroll suave para el enlace "Contáctanos"
    document.querySelector('.contact-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contacto').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Efecto parallax
    var parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        parallaxElements.forEach(function(element) {
            var speed = element.getAttribute('data-speed') || 0.1; // Velocidad por defecto más lenta
            element.style.transform = 'translateY(' + (scrollTop * speed) + 'px)';
        });
    });
});








