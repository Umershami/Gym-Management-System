document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var regUsername = document.getElementById('regUsername').value;
    var regPassword = document.getElementById('regPassword').value;

    // Check if username already exists in localStorage
    if (localStorage.getItem(regUsername)) {
        alert('Username already exists. Please choose a different username.');
    } else {
        // Store username and password in localStorage (in a real app, hash passwords securely)
        localStorage.setItem(regUsername, regPassword);
        alert('Registration successful! Please login.');
        window.location.href = 'login.html'; // Redirect to login page after registration
    }
});
