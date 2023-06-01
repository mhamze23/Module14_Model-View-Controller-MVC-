// Select all delete buttons on the page
const deleteButtons = document.querySelectorAll('[id^="delete-btn-"]');

// Delete post handler function
const deletePostFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Extract the post ID from the clicked button's ID
    const postId = event.target.id.split('-')[2];

    // Send a DELETE request to the server for the specified post
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        // If the response is ok, redirect to the dashboard page
        document.location.replace('/dashboard');
    } else {
        // If there's an error, show an alert
        alert('Failed to delete post. Please try again!');
    }
};

// Attach the delete post handler function to the click event of all delete buttons
deleteButtons.forEach(button => {
  button.addEventListener('click', deletePostFormHandler);
});
