// Function to handle logout
async function logout() {
    try {
      // Send a POST request to the logout API
      const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
  
      // If the response is successful, redirect to the home page
      if (response.ok) {
        document.location.replace('/');
      } else {
        // If the response is not successful, show an alert with the status text
        alert(response.statusText);
      }
    } catch (error) {
      // If an error occurs, show an alert with the error message
      alert(error.message);
    }
  }
  
  // Attach the logout function to the click event of the 'logout' button
  document.querySelector('#logout').addEventListener('click', logout);
  