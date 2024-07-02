
document.addEventListener('click', function(event) {
    var settingsBtn = document.getElementById('settingsBtn');
    var settingsDropdown = document.getElementById('ps');

    // Check if the click is outside the settings dropdown
    if (event.target !== settingsBtn && !settingsDropdown.contains(event.target)) {
        settingsDropdown.style.display = 'none';
    }
});


document.getElementById('settingsBtn').addEventListener('click', function() {
    var st = document.getElementById('ps');
    if (st.style.display === 'none' || st.style.display === '') {
        st.style.display = 'block';
    } else {
        st.style.display = 'none';
    }
});