/**
 * International Travel Section - Toggle Functionality
 * Handles expanding/collapsing country cards and showing city photos
 */

// City photo data
const cityPhotosData = {
  'bangkok': {
    name: 'Bangkok',
    photos: [
      { title: 'Bangkok City', desc: 'Capital of Thailand', image: 'bankok.jpg' }
    ]
  },
  'pattaya': {
    name: 'Pattaya',
    photos: [
      { title: 'Pattaya Beach View 1', desc: 'Beautiful coastal city of Thailand', image: 'pat1.jpg' },
      { title: 'Pattaya Beach View 2', desc: 'Stunning beach resort destination', image: 'pat2.jpg' }
    ]
  },
  'coral-island': {
    name: 'Coral Island',
    photos: [
      { title: 'Coral Island Paradise', desc: 'Beautiful island near Pattaya', image: 'coral1.jpg' }
    ]
  }
};

function toggleCountry(countryId) {
  const content = document.getElementById(countryId + '-content');
  const button = event.currentTarget;
  
  if (content.style.display === 'none' || content.style.display === '') {
    // Show content
    content.style.display = 'block';
    button.classList.add('active');
  } else {
    // Hide content
    content.style.display = 'none';
    button.classList.remove('active');
    // Close photos when closing country
    closeCityPhotos();
  }
}

function showCityPhotos(cityId) {
  const cityData = cityPhotosData[cityId];
  if (!cityData) return;
  
  const container = document.getElementById('city-photos-container');
  const title = document.getElementById('city-photos-title');
  const grid = document.getElementById('city-photos-grid');
  
  // Set title
  title.textContent = cityData.name;
  
  // Clear and populate grid
  grid.innerHTML = '';
  
  cityData.photos.forEach((photo, index) => {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.style.animationDelay = `${index * 0.1}s`;
    
    const imagePath = `images/${photo.image}`;
    console.log('Loading image:', imagePath);
    
    photoCard.innerHTML = `
      <div class="photo-image-wrapper">
        <img src="${imagePath}" alt="${photo.title}" 
             onerror="console.error('Failed to load image: ${imagePath}'); this.style.display='none';"
             onload="console.log('Image loaded successfully: ${imagePath}')">
      </div>
      <div class="photo-info">
        <h5>${photo.title}</h5>
        <p>${photo.desc}</p>
      </div>
    `;
    
    grid.appendChild(photoCard);
  });
  
  // Show container with animation
  container.style.display = 'block';
  setTimeout(() => {
    container.classList.add('show');
  }, 10);
  
  // Scroll to photos
  setTimeout(() => {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 300);
}

function closeCityPhotos() {
  const container = document.getElementById('city-photos-container');
  if (container) {
    container.classList.remove('show');
    setTimeout(() => {
      container.style.display = 'none';
    }, 300);
  }
}

// Add smooth scroll animation when section loads
document.addEventListener('DOMContentLoaded', function() {
  const countryCards = document.querySelectorAll('.country-card');
  
  // Add staggered animation
  countryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
});
