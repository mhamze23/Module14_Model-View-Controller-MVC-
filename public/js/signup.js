// Define the function that will handle the signup event
const handleSignup = async (event) => {
    // Prevent default form submission
    event.preventDefault();

    // Retrieve user input for username and password
    const enteredUsername = document.querySelector('#username-signup').value.trim();
    const enteredPassword = document.querySelector('#password-signup').value.trim();

    // Validate if both fields have a value
    if (enteredUsername && enteredPassword) {
        try {
            // Attempt to create a new user
            const responseSignUp = await fetch('/api/users/', {
                method: 'POST',
                body: JSON.stringify({ username: enteredUsername, password: enteredPassword }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Validate if the signup was successful
            if (!responseSignUp.ok) {
                throw new Error('Signup failed. Please try again.');
            }

            // Attempt to log the user in immediately after signup
            const responseLogin = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username: enteredUsername, password: enteredPassword }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Validate if the login was successful
            if (!responseLogin.ok) {
                throw new Error('Login failed. Please try again.');
            }

            // Redirect the user to the dashboard
            document.location.replace('/dashboard');
        } catch (error) {
            // Display an alert to the user with the error message
            alert(error);
        }
    } else {
        // Alert the user to fill out both fields
        alert('Please provide a username and a password.');
    }
};

// Attach the handleSignup function to the form submit event
document.querySelector('.signup-form').addEventListener('submit', handleSignup);
