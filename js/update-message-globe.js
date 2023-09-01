const uploadButton = document.getElementById('uploadButton');
const imageUpload = document.getElementById('imageUpload');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const cancelButton = document.getElementById('cancelButton');

uploadButton.addEventListener('click', function() {
    imageUpload.click(); // Simulate a click on the hidden file input
    });

imageUpload.addEventListener('change', function(event) {
const selectedFile = event.target.files[0];
if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function() {
        previewImage.src = reader.result;
        previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(selectedFile);
}
});

cancelButton.addEventListener('click', function() {
    previewContainer.style.display = 'none';
    previewImage.src = ''; // Reset the preview image
    imageUpload.value = ''; // Reset the file input
});