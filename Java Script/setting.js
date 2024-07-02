document.getElementById('settingsBtn').addEventListener('click', function() {
    var st = document.getElementById('ps');
    if (st.style.display === 'none' || st.style.display === '') {
        st.style.display = 'block';
    } else {
        st.style.display = 'none';
    }
});