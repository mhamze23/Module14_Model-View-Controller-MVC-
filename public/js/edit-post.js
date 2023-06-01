// Define the event handler function for editing posts
const editPostFormHandler = async (event) => {
  event.preventDefault();

  // Extract post id and description from the form
  const postId = document.querySelector('.edit-post-section').dataset.postId; // changed to camelCase
  const description = document.querySelector('textarea[name="editPostDescription"]').value.trim(); // changed to camelCase

  if (description) {
      // Make a PUT request to the API endpoint for editing posts
      const response = await fetch(`/api/posts/${postId}`, { // changed to camelCase
          method: 'PUT',
          body: JSON.stringify({description}),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // If the request was successful, redirect to the dashboard
          document.location.replace('/dashboard');
      } else {
          alert('Something went wrong. Please try again!');
      }
  }
};

// Attach the event listener to the form submission
document.querySelector('.edit-post').addEventListener('submit', editPostFormHandler);