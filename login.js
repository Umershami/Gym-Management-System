document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if stored password matches entered password for the username
    var storedPassword = localStorage.getItem(username);
    if (password === storedPassword) {
        localStorage.setItem('loggedIn', 'true'); // Store login status
        window.location.href = 'dashboard.html'; // Redirect to dashboard on success
    } else {
        alert('Invalid username or password');
    }
});
