document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedPassword = localStorage.getItem(username);

    if (storedPassword) {
        if (password === storedPassword) {
            localStorage.setItem('loggedIn', 'true'); // Store login status
            window.location.href = 'dashboard.html'; // Redirect to dashboard on success
        } else {
            alert('Invalid username or password');
        }
    } else {
        alert('You need to register first');
        window.location.href = 'register.html'; // Redirect to registration page
    }
});
