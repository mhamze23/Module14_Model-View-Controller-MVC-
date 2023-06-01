// Async function to handle new post creation
const handleNewPost = async (event) => {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get values from form inputs
  const postTitle = document.querySelector('input[name="new-post-title"]').value.trim();
  const postDescription = document.querySelector('textarea[name="new-post-description"]').value.trim();

  // Check if title and description fields are filled
  if (postTitle && postDescription) {
      // Make a POST request to the server
      const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify({ title: postTitle, description: postDescription }),
      headers: { 'Content-Type': 'application/json' },
      });

      // If request was successful, redirect to dashboard
      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
      // Alert the user in case of error
      alert('Error occurred. Please try again!');
      }
  }
};

// Attach event listener to the form submission
document.querySelector('.create-blog-form').addEventListener('submit', handleNewPost);
