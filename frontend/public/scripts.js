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
});

