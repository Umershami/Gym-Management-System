document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settingsBtn').addEventListener('click', function() {
        document.getElementById('settingsBar').style.display = 'block';
    });

    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('settingsBar').style.display = 'none';
    });

    // Optional: Close the settings bar if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('settingsBar')) {
            document.getElementById('settingsBar').style.display = 'none';
        }
    });
});
