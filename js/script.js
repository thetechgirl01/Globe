
document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.getElementById('signup-button');
    let loaderVisible = false;

    signupButton.addEventListener('click', async function(event) {
        event.preventDefault();


        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');

        // Check if any required field is empty
        if (firstName.value === '') {
            showError(firstName, 'Please enter first name');
            return;
        } else {
            clearError(firstName);
        }

        if (lastName.value === '') {
            showError(lastName, 'Please enter last name');
            return;
        } else {
            clearError(lastName);
        }

        if (email.value === '') {
            showError(email, 'Please enter email');
            return;
        } else {
            clearError(email);
        }

        if (password.value === '') {
            showError(password, 'Please enter password');
            return;
        } else {
            clearError(password);
        }

        if (confirmPassword.value === '') {
            showError(confirmPassword, 'Please confirm password');
            return;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            return;
        } else {
            clearError(confirmPassword);
        }

        function showLoader() {
            loader.style.display = 'block';
            signupButton.style.display = 'none'; // Hide the button while showing the loader
            loaderVisible = true; // Set loader visibility to true
        }

        // Function to hide the loader
        function hideLoader() {
            loader.style.display = 'none';
            signupButton.style.display = 'block'; // Show the button again
            loaderVisible = false; // Set loader visibility to false
        }

        // Check if the loader is visible before attempting to hide it
        function tryHideLoader() {
            if (loaderVisible) {
                setTimeout(function() {
                    tryHideLoader(); // Hide the loader after the alert appears
                }, 1000); // Wait for 1 second before hiding the loader
            }
        }

        showLoader(); // Show the loader when the Sign Up button is clicked

        // Rest of your code for form submission
        try {
            const response = await fetch('https://globe-blog.onrender.com/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                })
            });

            const responseData = await response.json();

            if (response.status === 200) {
                alert('Account registered successfully:', responseData.message);
                // Redirect to the landing page upon successful signup
                window.location.href = '/src/landingpage.html'; 
            } else if (response.status === 409) {
                alert('Account already exists:', responseData.message);
            } else {
                alert('An error occurred: Please try again', responseData.message);
            }
        } catch (error) {
            alert('An error occurred: Please try again', error);
        } finally {
            setTimeout(function() {
                hideLoader(); // Hide the loader after the alert appears
            }, 1000); // Wait for 1 second before hiding the loader
        }
    });

    // Show error message and style the field
    function showError(field, message) {
        field.style.border = '2px solid red';

        // Remove any existing error message
        clearError(field);

        // Create and display the error message
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.classList.add('error-message');
        errorMessage.style.color = '#E22A5C'
        errorMessage.style.textAlign = 'center';
        errorMessage.style.fontWeight = '700';
        errorMessage.style.fontSize = '16px';
        errorMessage.style.width = '355px';
        errorMessage.style.padding = '5px';
        errorMessage.style.lineHeight = '50px';
        errorMessage.style.marginTop = '-2px';
        errorMessage.style.backgroundColor = '#F9D4DE';

        
        field.parentElement.insertBefore(errorMessage, field);

        // Add margin-top to the next .input-group
        const nextInputGroup = field.parentElement.nextElementSibling;
        if (nextInputGroup && nextInputGroup.classList.contains('input-group')) {
            nextInputGroup.style.marginTop = '30px';
        }

        // Remove the error message after 3 seconds
        setTimeout(function() {
            errorMessage.remove();
            nextInputGroup.style.marginTop = '0'; // Reset margin-top after error message is removed
            
            // Add back the input border
            field.style.border = '2px solid red';
        }, 3000);
    }

    // Clear error message and styling
    function clearError(field) {
        field.style.border = 'none';

        // Remove any existing error message
        const existingErrorMessage = field.parentElement.querySelector('.error-message');
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }
    }
});


/* clap interactivity */

