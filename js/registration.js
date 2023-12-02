document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Perform registration logic (send data to server, etc.)
    console.log('Registration Details:', { username, password });
    // You can add code here to send this data to your backend for registration
  });
  