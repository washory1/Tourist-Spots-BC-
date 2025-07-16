const map = L.map('map').setView([53.7267, -127.6476], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

const markerMap = new Map();

touristSpots.forEach((spot, index) => {
  const marker = L.marker([spot.location.lat, spot.location.lng]).addTo(map);
  marker.bindPopup(`<strong>${spot.name}</strong><br>${spot.description}`);
  markerMap.set(spot.name.toLowerCase(), marker);
});

const spotListEl = document.getElementById('spotList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function renderSpotList() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  spotListEl.innerHTML = '';

  touristSpots
    .filter(spot => {
      const matchName = spot.name.toLowerCase().includes(searchValue);
      const matchCategory = selectedCategory === 'All' || spot.category === selectedCategory;
      return matchName && matchCategory;
    })
    .forEach(spot => {
      const li = document.createElement('li');
      li.textContent = spot.name;
      li.onclick = () => {
        map.setView([spot.location.lat, spot.location.lng], 10);
        const marker = markerMap.get(spot.name.toLowerCase());
        if (marker) marker.openPopup();
      };
      spotListEl.appendChild(li);
    });
}

searchInput.addEventListener('input', renderSpotList);
categoryFilter.addEventListener('change', renderSpotList);

renderSpotList(); // initial render
