// Function to handle the submission of the new post form
async function newFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Get the title and blog post from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const blog_post = document.querySelector('input[name="blog_post"]').value;
  
    // Send a POST request to the API to create a new post
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        blog_post
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // If the response is successful, redirect to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If there's an error, show an alert with the status text
      alert(response.statusText);
    }
  }
  
  // Add an event listener to the new post form for the submit event
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  