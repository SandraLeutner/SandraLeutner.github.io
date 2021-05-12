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
    fullscreenControl: true,
    layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ]
});


let nav = document.querySelector("#navigation");
console.log("Navigation HTML Element: ", nav);

ROUTE.sort((stop1, stop2) => {
    if(stop1.nr > stop2.nr) {
        return 1;
    } else {
        return -1;
    }
});

//for-Schleife und if-Abfrage
//console.log(ROUTE);
for (let entry of ROUTE) {
    //console.log(entry);
    
    nav.innerHTML += `
    <option value="${entry.user}">Stop ${entry.nr}: ${entry.name}</option>
    `;
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

nav.options.selectedIndex = 25-1;
nav.onchange = (evt) => {
    let selected = evt.target.selectedIndex;
    let options = evt.target.options;
    let username = options[selected].value;
    let link = `https://${username}.github.io/nz/index.html`;
    console.log(username, link);

    //geht auf ausgewählte seite mit window.location.href
    window.location.href = link;

};


//Leaflet Minimap

var miniMap = new L.Control.MiniMap(
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'), {
        toggleDisplay: true,
        minimized: false
    }
).addTo(map);