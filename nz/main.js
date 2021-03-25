//stop-Objekt erstellen, 6 key value pairs, auf einzelne Elemente des Objekts kann zugegriffen werden
let stop = {
    nr: 25,
    name: 'Auckland',
    lat: -36.833333,
    lng: 174.8,
    user: 'SandraLeutner',
    wikipedia:'https://en.wikipedia.org/wiki/Auckland'
};

console.log(stop);

const map = L.map("map", {
    center: [ stop.lat, stop.lng  ],
    zoom: 13,
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
  });
  
  let mrk = L.marker([ stop.lat, stop.lng ]).addTo(map);
  mrk.bindPopup('Auckland').openPopup();
  
  //console.log(document.querySelector("#map"));