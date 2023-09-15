const uploadButton = document.getElementById("uploadButton");
const imageUpload = document.getElementById("imageUpload");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const cancelButton = document.getElementById("cancelButton");
const publishButton = document.querySelector(".buttonsection");
const postTitle = document.getElementById("input-title");
const postContent = document.getElementById("input-story");
const minimumCharacters = 70;
const textarea = document.getElementById("input-story");
const loader = document.getElementById("loader");

uploadButton.addEventListener("click", function () {
  imageUpload.click(); // Simulate a click on the hidden file input
});

imageUpload.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function () {
      previewImage.src = reader.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(selectedFile);
  }
});

cancelButton.addEventListener("click", function () {
  previewContainer.style.display = "none";
  previewImage.src = ""; // Reset the preview image
  imageUpload.value = ""; // Reset the file input
});

function showLoader() {
  loader.style.display = "block";
  publishButton.style.display = "none";
}
function hideLoader() {
  loader.style.display = "none";
  publishButton.style.display = "block";
}

publishButton.addEventListener("click", async (e) => {
  if (!(postContent.value.length < minimumCharacters)) {
    e.preventDefault();
  }
  if (!postTitle.value) {
    postTitle.style.borderStyle = "solid";
    postTitle.style.borderColor = "red";
    postTitle.style.borderWidth = "4px";
    postTitle.style.outlineColor = "red";

    setTimeout(() => {
      postTitle.style.borderColor = "black";
      postTitle.style.borderWidth = "2px";
      postTitle.style.outlineColor = "black";
    }, 2000);
    return;
  }
  if (postContent.value.length < minimumCharacters) {
    postContent.style.borderStyle = "solid";
    postContent.style.borderColor = "red";
    postContent.style.borderWidth = "4px";
    postContent.style.outlineColor = "red";
    setTimeout(() => {
      postContent.style.borderColor = "black";
      postContent.style.borderWidth = "2px";
      postContent.style.outlineColor = "black";
    }, 2000);
    return;
  }
  showLoader();

  try {
    const formData = new FormData();
    formData.append("title", postTitle.value);
    formData.append("content", postContent.value);
    const headers = new Headers()
    console.log(formData)
    console.log('formData title: ', formData.get('title'))
    console.log(postTitle.value)
    console.log(postContent.value)

    const response = await fetch(
      "https://globe-blog.onrender.com/api/v1/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get('title'),
          content: formData.get('content'),
        }),
      }
    );
    // const response = await fetch(
    //   "https://globe-blog.onrender.com/api/v1/posts",
    //   {
    //     method: "POST",
    //     headers: headers,
    //     body: formData,
    //   }
    // );
    hideLoader();
    const responseData = await response.json();
    console.log('responseData: ', responseData)
    console.log('response status: ', response.status)

    if (response.status === 200 || response.status === 201) {
      alert("Post Created Successfully:");
      // Redirect to the landing page upon successful signup
      window.location.href = "/src/landingpage.html";
    } else {
      alert("An error occurred: Please try again", responseData.message);
    }
  } catch (error) {
     hideLoader();
    alert("An error occurred: Please try againhjghjghkj", error);
  } finally {
  }
});

// textarea

textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});