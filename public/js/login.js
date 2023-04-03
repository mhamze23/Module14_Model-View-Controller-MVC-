// Async function to handle login form submission
async function loginFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Retrieve and trim the input values for username and password
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // Check if both username and password are provided
    if (username && password) {
      // Make a POST request to the server to authenticate user
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the response is successful
      if (response.ok) {
        // Redirect to the dashboard
        document.location.replace('/dashboard/');
      } else {
        // Show an error alert with the response status text
        alert(response.statusText);
      }
    }
  }
  
  // Add an event listener to the login form for the submit event
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  