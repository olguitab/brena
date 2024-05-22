<script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch('/submit', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'https://app.youform.io/forms/sm9eblvg'; // Redirigir a la URL deseada
            } else {
                return response.text().then(text => { // Añade esto para ver el error en detalle
                    throw new Error('Error al enviar el formulario: ' + text);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
</script>















