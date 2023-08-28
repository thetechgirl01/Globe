

//sign up //



document.addEventListener('DOMContentLoaded', function() {
    // const signupForm = document.getElementById('sign-up');
     
     // Get a reference to the signup button using its class
     const signupButton = document.getElementById('signup-button');
     
     signupButton.addEventListener('click', async function(event) {
         event.preventDefault();
         
         const firstName = document.getElementById('first-name').value;
         const lastName = document.getElementById('last-name').value;
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;
 
         const formData = {
             firstName: firstName,
             lastName: lastName,
             email: email,
             password: password
         };
         console.log(formData)

         try {
             const response = await fetch('https://globe-blog.onrender.com/api/v1/users', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(formData)
             });
 
             const responseData = await response.json();
 
             console.log(response)
 
             if (response.status === 200) {
                 console.log('User registered successfully:', responseData.message);
                 // Redirect to a success page or display a success message
             } else if (response.status === 409) {
                 console.log('User already exists:', responseData.message);
                 // Display a message indicating the user already exists
             } else {
                 console.log('An error occurred:', responseData.message);
                 // Display a general error message
             }
         } catch (error) {
             console.error('An error occurred:', error);
         }
     });
 });