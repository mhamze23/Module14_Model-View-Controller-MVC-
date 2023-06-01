// This function handles the comment form submission
const handleCommentFormSubmit = async (event) => {
    event.preventDefault();

    // Get the comment text from the form
    const commentText = document.querySelector('#comment-input').value.trim();

    // Get the post ID from the form's data attribute
    const postId = document.querySelector('.comment-form').dataset.postId; // Changed to camelCase
  
    if (commentText) { // If there's a comment to post...
      
      // Send a POST request to the server
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ commentText, postId }), // Changed to camelCase
        headers: { 'Content-Type': 'application/json' },
      });

      // Reload the page to see the new comment
      document.location.reload();
    }
};

// Attach the submit event listener to the comment form
document.querySelector('.comment-form').addEventListener('submit', handleCommentFormSubmit);

