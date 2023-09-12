document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login-button");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loader = document.getElementById('loader')
    console.log(loader)
  
    function showLoader() {
      loader.style.display = "block";
      loginButton.style.display = "none";
    }
    function hideLoader() {
      loader.style.display = "none";
      loginButton.style.display = "block";
    }
  
    loginButton.addEventListener("click", async function (event) {
      event.preventDefault();
      if (!email.value) {
        email.style.border = "solid";
        email.style.borderWidth = "2px";
        email.style.borderColor = "red";
  
        setTimeout(() => {
          email.style.border = "none";
        }, 2000);
        return;
      }
      if (!password.value) {
        password.style.border = "solid";
        password.style.borderWidth = "2px";
        password.style.borderColor = "red";
        setTimeout(() => {
          password.style.border = "none";
        }, 2000);
        return;
      }
  
      
      showLoader()
      try {
        const response = await fetch(
          "https://globe-blog.onrender.com/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          }
        );
  
        const responseData = await response.json();
        hideLoader()
        if (response.status === 200 || response.status === 201) {
          alert("Login Successful:", responseData.message);
          // Redirect to the landing page upon successful signup
          window.location.href = "/src/landingpage.html";
        } else if(response.status === 400) {
          alert("Email or Password Incorrect");
        }
      } catch (error) {
        alert("An error occurred: Please try againsss", error);
      } finally {
      }
    });
  });
  