// Async function to handle comment form submission
async function commentFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get comment text from the textarea
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Get the post ID from the current URL
    const urlParts = window.location.toString().split('/');
    const post_id = urlParts[urlParts.length - 1];

    // Check if the comment text is not empty
    if (comment_text) {
        // Send a POST request to create a new comment
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is successful
        if (response.ok) {
            // Reload the page to show the new comment
            document.location.reload();
        } else {
            // Alert the user with the response status text
            alert(response.statusText);
        }
    }
}

// Add a submit event listener to the comment form
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
