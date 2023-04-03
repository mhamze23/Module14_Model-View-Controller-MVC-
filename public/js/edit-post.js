// Edit Post form handler
async function editFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Get the post title, content, and ID
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const blog_content = document.querySelector('input[name="blog_post"]').value;
    const id = window.location.pathname.split('/').pop();
  
    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        blog_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // Check if the response is OK and redirect to the dashboard, else show an alert
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  // Add the event listener to the edit post form
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  