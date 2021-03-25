
const map = L.map("map", {
    center: [ -36.833333,174.8  ],
    zoom: 13,
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
  });
  
  let mrk = L.marker([ -36.833333,174.8 ]).addTo(map);
  mrk.bindPopup('Auckland').openPopup();
  
  console.log(document.querySelector("#map"));