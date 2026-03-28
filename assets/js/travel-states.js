/* ===================================
   INTERACTIVE STATE-BASED TRAVEL GALLERY
   Click on state cards to expand and view photos
   =================================== */

(function() {
  'use strict';

  // Travel data organized by states
  const travelData = {
    'uttar-pradesh': {
      name: 'Uttar Pradesh',
      emoji: '🕉️',
      color: '#FF6B6B',
      count: 5,
      locations: [
        { title: 'Deepotsav 2022 (Ayodhya)', desc: 'Ram ki paidi Ayodhya', image: 'Deepotsav.jpg' },
        { title: 'Ganga Bairaz', desc: 'Kanpur', image: 'gangaBairaz.jpg' },
        { title: 'Ganga Aarti at Varanasi Ghat', desc: 'Varanasi(Banaras)', image: 'Kashi.jpg' },
        { title: 'JNV Faizabad (Ayodhya)', desc: 'Jawahar Navodaya Vidyaaya Ayodhya', image: 'Jnv.jpg' },
        { title: 'Ayodhya', desc: 'Birth Place of Shri Ram Ji (Ram Ki Paidi)', image: 'ayodhya.jpg' }
      ]
    },
    'uttarakhand': {
      name: 'Uttarakhand',
      emoji: '🏔️',
      color: '#4ECDC4',
      count: 6,
      locations: [
        { title: 'Haridwar', desc: 'Rishikesh, Mansa Devi, Chandi Devi', image: 'haidwar.jpg' },
        { title: 'Tapovan (Rishikesh)', desc: 'Rishikesh (Uttarakhand)', image: 'Rishikesh.jpg' },
        { title: 'Ganga Aarti (Triveni Ghat)', desc: 'Rishikesh (Uttarakhand)', image: 'TriveniGhat.jpg' },
        { title: 'Laxman Jhula (Rishikesh)', desc: 'Rishikesh (Uttarakhand)', image: 'Laxman.jpg' },
        { title: 'Kempty Fall', desc: 'Mussoorie (Uttarakhand)', image: 'Kemptyfall.jpg' },
        { title: 'Company Baag', desc: 'Mussoorie (Uttarakhand)', image: 'Company.jpg' }
      ]
    },
    'delhi': {
      name: 'Delhi',
      emoji: '🏛️',
      color: '#95E1D3',
      count: 1,
      locations: [
        { title: 'Qutub Minar', desc: 'Delhi', image: 'delhi.jpg' }
      ]
    },
    'telangana': {
      name: 'Telangana',
      emoji: '🏰',
      color: '#F38181',
      count: 9,
      locations: [
        { title: 'Ramoji FilmCity', desc: 'Hyderabad', image: 'ramoji.jpg' },
        { title: 'Charminar', desc: 'Hyderabad', image: 'IMG20210811202329.jpg' },
        { title: 'Tank Bund Buddha', desc: 'Hyderabad', image: 'tankbund.jpg' },
        { title: 'Green Field Resort', desc: 'Hyderabad', image: 'resort.jpg' },
        { title: 'Ananthgiri Hills Camping', desc: 'Hyderabad', image: 'ananthgiriHills.jpg' },
        { title: 'Wonderla Hyd', desc: 'Hyderabad', image: 'WonderleHyd.jpg' },
        { title: 'Golkunda Fort', desc: 'Hyderabad', image: 'FB_IMG_1664904118649.jpg' },
        { title: 'Durgam Cherruv Cable bridge', desc: 'Madhapur - New Year 2023', image: 'bridge2023.jpg' },
        { title: 'Ramappa Lake', desc: 'Warangal (Telangana)', image: 'warangal.jpg' }
      ]
    },
    'tamil-nadu': {
      name: 'Tamil Nadu',
      emoji: '🌴',
      color: '#AA96DA',
      count: 6,
      locations: [
        { title: 'Kanyakumari Beach', desc: 'Kanyakumari', image: 'kk.jpg' },
        { title: 'Minakshi Temple', desc: 'Madurai', image: 'madurai.jpg' },
        { title: 'Mayiladuthurai Kornadu', desc: 'Lake', image: 'mayilathudurai.jpg' },
        { title: 'Isha Yoga Center', desc: 'Meditation Centre (Coimbatore)', image: 'eshayoga.jpg' },
        { title: 'Aliyar Reservoir', desc: 'Aliyar village near Pollachi (Coimbatore)', image: 'aaliyar.jpg' },
        { title: 'Tirparappu Water Falls', desc: 'Nagercoil', image: 'waterfall.jpg' }
      ]
    },
    'karnataka': {
      name: 'Karnataka',
      emoji: '🏞️',
      color: '#FCBAD3',
      count: 3,
      locations: [
        { title: 'Mysore Fort', desc: 'Mysore', image: 'mysore.jpg' },
        { title: 'Golden Temple', desc: 'Coorg Karnataka', image: '20190126_154148.jpg' },
        { title: 'Coorg', desc: 'Karnataka', image: 'IMG-20190127-WA0005.jpg' }
      ]
    },
    'kerala': {
      name: 'Kerala',
      emoji: '🌿',
      color: '#A8D8EA',
      count: 1,
      locations: [
        { title: 'Kerala', desc: 'Manchester of India (Neillampathy)', image: 'kerla.jpg' }
      ]
    },
    'rajasthan': {
      name: 'Rajasthan',
      emoji: '🏜️',
      color: '#FFD93D',
      count: 1,
      locations: [
        { title: 'Kota (Seven Wonder)', desc: 'Rajasthan', image: 'kota.jpg' }
      ]
    }
  };

  // Initialize travel gallery
  function initTravelGallery() {
    const container = document.getElementById('travel-states-container');
    if (!container) return;

    // Create state cards
    Object.keys(travelData).forEach(stateKey => {
      const state = travelData[stateKey];
      const stateCard = createStateCard(stateKey, state);
      container.appendChild(stateCard);
    });

    // Add click listeners
    addStateCardListeners();
  }

  // Create a state card
  function createStateCard(stateKey, state) {
    const card = document.createElement('div');
    card.className = 'state-card';
    card.setAttribute('data-state', stateKey);
    card.style.setProperty('--state-color', state.color);

    card.innerHTML = `
      <div class="state-card-header">
        <div class="state-emoji">${state.emoji}</div>
        <div class="state-info">
          <h3 class="state-name">${state.name}</h3>
          <p class="state-count">${state.count} ${state.count === 1 ? 'Location' : 'Locations'}</p>
        </div>
        <div class="state-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
      <div class="state-locations" id="locations-${stateKey}">
        <div class="row">
          ${state.locations.map(location => createLocationCard(location)).join('')}
        </div>
      </div>
    `;

    return card;
  }

  // Create a location card
  function createLocationCard(location) {
    return `
      <div class="col-4 col-6-medium col-12-small">
        <article class="box style2 location-card">
          <a href="#" class="image featured"><img src="images/${location.image}" alt="${location.title}" /></a>
          <h3><a href="#">${location.title}</a></h3>
          <p>${location.desc}</p>
        </article>
      </div>
    `;
  }

  // Add click listeners to state cards
  function addStateCardListeners() {
    const stateCards = document.querySelectorAll('.state-card');
    
    stateCards.forEach(card => {
      const header = card.querySelector('.state-card-header');
      
      header.addEventListener('click', function() {
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        stateCards.forEach(c => {
          c.classList.remove('active');
        });
        
        // Toggle current card
        if (!isActive) {
          card.classList.add('active');
          
          // Smooth scroll to card
          setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 300);
        }
      });
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTravelGallery);
  } else {
    initTravelGallery();
  }

})();
