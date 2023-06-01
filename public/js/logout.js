// Function for user logout process
const userLogout = async () => {

  // Send POST request to the server to end user's session
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // Check the response status
  if (response.ok) {
    // If response is OK, redirect user to the login page
    document.location.replace('/login');
  } else {
    // If there was an error, alert the user
    alert(response.statusText);
  }
};

// Event listener for the logout button
document.querySelector('#logoutButton').addEventListener('click', userLogout); // changed to camelCase
