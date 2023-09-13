// Function to fetch posts from the API
async function fetchPosts() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  function formatRelativeTime(dateString) {
    const createdAt = new Date(dateString || Date.now()); // Use current date if createdAt is missing
    const now = new Date();
    const diffInMilliseconds = now - createdAt;

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    
    if (diffInMilliseconds < 60000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 1000), 'second');
    } else if (diffInMilliseconds < 3600000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 60000), 'minute');
    } else if (diffInMilliseconds < 86400000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 3600000), 'hour');
    } else if (diffInMilliseconds < 604800000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 86400000), 'day');
    } else if (diffInMilliseconds < 2419200000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 604800000), 'week');
    } else if (diffInMilliseconds < 29030400000) {
      return rtf.format(-Math.floor(diffInMilliseconds / 2419200000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInMilliseconds / 29030400000), 'year');
    }
  }


  //
  function renderPosts(posts) {
    const postContainer = document.getElementById('post');
  
    // Create an object to store posts by category
    const postsByCategory = {};
  
    // Group posts by category
    posts.data.forEach(post => {
      const category = post.category || 'Top Stories';
      if (!postsByCategory[category]) {
        postsByCategory[category] = [];
      }
      postsByCategory[category].push(post);
    });
  
    // Clear the existing content in the post container
    postContainer.innerHTML = '';
  
    // Loop through categories and their associated posts
    for (const category in postsByCategory) {
      const categoryElement = document.createElement('section');
      categoryElement.id = category.toLowerCase();
      categoryElement.innerHTML = `
        <h2>${category}</h2>
        <div class="cards"></div>
      `;
  
      const cardsContainer = categoryElement.querySelector('.cards');
  
      postsByCategory[category].forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('card');
        postElement.innerHTML = `
          <!--Card-->
          <span><img src="../img/demo.jpg" alt=""></span>
          <div class="post-details">
              <div class="user-time">
                  <span>${post.author||'Author'} | </span>
                  <span>${formatRelativeTime(post.createdAt)}</span>
                  <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                  </span>
              </div>
              <div class="big-text">${post.title}</div>
              <div class="small-btn">
                  <span class="small-text clamp-2">${post.content||'No content found!'}</span>
                  <span> <button><a href="./readmore.html">Read more</a></button></span>
              </div>
          </div>
        `;
        cardsContainer.appendChild(postElement);
      });
  
      postContainer.appendChild(categoryElement);
    }
  }
  
  
  
  // API URL
  const apiUrl = 'https://globe-blog.onrender.com/api/v1/posts/';
  
  // Fetch and render the posts
  fetchPosts(apiUrl)
    .then(posts => {
      renderPosts(posts);
      console.log('fetched posts!!!')
    })
    .catch(error => {
      console.error('An error occurred fetchin posts:', error);
    });
  