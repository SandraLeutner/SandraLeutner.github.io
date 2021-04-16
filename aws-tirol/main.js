let basemapGray = L.tileLayer.provider('BasemapAT.grau');

let map = L.map("map", {
    center: [47, 11],
    zoom: 9,
    layers: [
        basemapGray
    ]
});

//zwischen Layern hin und herschalten bzw Layer hinzufügen, provider Plugin
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


//feature group: kann man an und ausschalten und man kann für alle wetterstationen etwas anwenden
let awsLayer = L.featureGroup();
layerControl.addOverlay(awsLayer, "Wetterstationen Tirol");

// awsLayer.addTo(map);
let snowLayer = L.featureGroup();
layerControl.addOverlay(snowLayer, "Schneehöhen");

//snowLayer.addTo(map);
let windLayer = L.featureGroup();
layerControl.addOverlay(windLayer, "Windgeschwindigkeit (km/h)");

//Lufttemperaturlayer
let tempLayer = L.featureGroup();
layerControl.addOverlay(tempLayer, "Lufttemperatur");
tempLayer.addTo(map);

//Seite im Web laden und auf awsUrl zugreifen und Marker zur Karte hinzufügen
//fetch aufruf ladet fehleranfälliges aus dem internet, daher angemessene reaktion
fetch(awsUrl).then(response => response.json())
    .then(json => {
        console.log('Daten konvertiert: ', json);
        //for schleife -> auf jede station zugreifen; lat und lon bei json umgekehrt
        for (station of json.features) {
            let marker = L.marker([
                station.geometry.coordinates[1],
                station.geometry.coordinates[0]
            ]);

            //datumsobjekt in formatted date --> funktionen anwendbar darauf
            let formattedDate = new Date(station.properties.date);

            marker.bindPopup(
                `<h3>${station.properties.name}</h3>
            <ul>
                <li>Datum: ${formattedDate.toLocaleString("de")}</li>
                <li>Seehöhe: ${station.geometry.coordinates[2]} m</li>
                <li>Temperatur: ${station.properties.LT} C</li>  
                <li>Schneehöhe: ${station.properties.HS || '?'} cm</li>          
                <li>Luftfeuchtigkeit: ${station.properties.RH || '?'} %</li>
                <li>Windgeschwindigkeit: ${station.properties.WG || '?'} km/h</li>
                <li> Windrichtung: ${station.properties.WR || '?'}</li>
            </ul>
            <a target="_blank" href="https://wiski.tirol.gv.at/lawine/grafiken/1100/standard/tag/${station.properties.plot}.png">Grafik</a>
            `);
            marker.addTo(awsLayer);
            //SCHNEE
            if (station.properties.HS) {
                let highlightClass = '';
                if (station.properties.HS > 100) {
                    highlightClass = 'snow-100';
                }
                if (station.properties.HS > 200) {
                    highlightClass = 'snow-200';
                }

                let snowIcon = L.divIcon({
                    html: `<div class = "snow-label ${highlightClass}">${station.properties.HS}</div>`
                })
                let snowMarker = L.marker([
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0],
                ], {
                    icon: snowIcon
                });
                snowMarker.addTo(snowLayer);
            }

            //WIND
            if (station.properties.WG) {
                let windHighlightClass = '';
                if (station.properties.WG > 10) {
                    windHighlightClass = 'wind-10';
                }
                if (station.properties.WG > 20) {
                    windHighlightClass = 'wind-20';
                }
                let windIcon = L.divIcon({
                    html: `<div class="wind-label ${windHighlightClass}">${station.properties.WG}</div>`,
                });
                let windMarker = L.marker([
                    station.geometry.coordinates[1],
                    station.geometry.coordinates[0]
                ], {
                    icon: windIcon
                });
                windMarker.addTo(windLayer);
            }


        }
        //set map view to all stations
        map.fitBounds(awsLayer.getBounds());
    });

//leaflet -> bibliothek, um karten zu zeichnen; funktionen mit L. aufrufbar und mit src="..." in html eingebunden
//