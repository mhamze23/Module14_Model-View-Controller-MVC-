// Async function to handle the form deletion
async function deleteFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Extract post ID from the current URL
    const id = window.location.toString().split('/').slice(-1)[0];
  
    // Send a DELETE request to the API endpoint with the post ID
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });
  
    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard
      document.location.replace('/dashboard/');
    } else {
      // Display an alert with the response status text
      alert(response.statusText);
    }
  }
  
  // Attach the deleteFormHandler to the delete-post-btn click event
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  