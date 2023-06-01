// Function handling user login
const handleUserLogin = async (event) => {
  // Preventing the default form submission behavior
  event.preventDefault();

  // Fetching input values and trimming unnecessary whitespaces
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If both username and password fields are filled
  if (username && password) {
    // Send a POST request to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the server response is OK (HTTP 200 status), redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If the server response is not OK, alert the user
      alert('Your username or password is incorrect. Please try again.');
    }
  }
};

// Add an event listener to the login form
document.querySelector('.login-form').addEventListener('submit', handleUserLogin);
