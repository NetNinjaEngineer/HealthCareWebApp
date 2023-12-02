  
  // Function to fetch data from your API
  function fetchImages() {
    // Replace 'your-api-endpoint' with your actual API endpoint
    fetch('https://localhost:7193/api/Departments/GetAllDepartments')
      .then(response => response.json())
      .then(data => renderImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }
  
  // Function to render images in HTML using CSS cards
  function renderImages(images) {
    const gallery = document.getElementById('imageGallery');
  
    images.forEach(image => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const img = document.createElement('img');
      img.src = image.imagePath;
      img.alt = `Image ${image.id}`;
  
      card.appendChild(img);
      gallery.appendChild(card);
    });
  }
  
  // Call the fetchImages function when the page loads
  window.onload = fetchImages;
  