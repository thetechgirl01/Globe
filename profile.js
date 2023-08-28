// script.js
const profileImage = document.querySelector('.profile-container img');

profileImage.addEventListener('click', function() {
    profileImage.src = 'new-profile-pic.jpg'; // Change the source to the new image
});