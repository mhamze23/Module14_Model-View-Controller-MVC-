// Async function to handle Sign Up form submission
async function signupFormHandler(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get input values and trim whitespaces
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if all input values are provided
    if (username && email && password) {
        // Send a POST request to create a new user
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            // Redirect to the dashboard
            document.location.replace('/dashboard/');
        } else {
            // Show an error message with the response status text
            alert(response.statusText);
        }
    }
}

// Add an event listener to the Sign Up form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
