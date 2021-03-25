//stop-Objekt erstellen, 6 key value pairs, auf einzelne Elemente des Objekts kann zugegriffen werden
let stop = {
    nr: 25,
    name: 'Auckland',
    lat: -36.833333,
    lng: 174.8,
    user: 'SandraLeutner',
    wikipedia: 'https://en.wikipedia.org/wiki/Auckland'
};

console.log(stop);

const map = L.map("map", {
    //center: [stop.lat, stop.lng],
    //zoom: 13,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
});

//for-Schleife und if-Abfrage

//console.log(ROUTE);
for (let entry of ROUTE) {
    console.log(entry);
    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`
        <h4>Stop ${entry.nr}: ${entry.name}</h4>
        <p><i class="fas fa-external-link-alt mr-3"></i><a href="${entry.wikipedia}">Read about stop in Wikipedia</a></p>
    `);

    if (entry.nr == 25){
        map.setView([entry.lat, entry.lng], 13);
        mrk.openPopup();
    }
}


//<option value="SandraLeutner">Auckland</option>
        

//console.log(document.querySelector("#map"));