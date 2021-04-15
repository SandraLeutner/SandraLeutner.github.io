let basemapGray = L.tileLayer.provider('BasemapAT.grau');

let map=L.map("map",{
    center: [47, 11],
    zoom: 9,
    layers: [
        basemapGray
    ]
});

//zwischen Layern hin und herschalten bzw Layer hinzufügen
let layerControl = L.control.layers({
    "BasemapAT.grau": basemapGray,
    "BasemapAT.orthofoto": L.tileLayer.provider('BasemapAT.orthofoto'),
    "BasemapAT.surface": L.tileLayer.provider('BasemapAT.surface'),
    "BasemapAT.overlay+ortho": L.layerGroup([
        L.tileLayer.provider('BasemapAT.orthofoto'),
        L.tileLayer.provider('BasemapAT.overlay')
    ])
}).addTo(map);

let awsUrl = 'https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson';

//Seite im Web laden und auf awsUrl zugreifen
fetch(awsUrl).then(response => response.json ())
    .then(json => {
    console.log('Daten konvertiert: ', json);
    for (station of json.features){
        console.log('Station: ', station);
        let marker = L.marker(
            [station.geometry.coordinates[1], 
            station.geometry.coordinates[0]]
            );
            marker.addTo(map);
    }
});