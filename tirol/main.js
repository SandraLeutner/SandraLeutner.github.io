/* global L */
// Bike Trail Tirol Beispiel

// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    tracks: L.featureGroup()
};

// Karte initialisieren und auf Innsbrucks Wikipedia Koordinate blicken
let map = L.map("map", {
    fullscreenControl: true,
    center: [47.267222, 11.392778],
    zoom: 9,
    layers: [
        baselayers.grau
    ]
})
// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "GPX-Tracks": overlays.tracks
}).addTo(map);

// Overlay mit GPX-Track anzeigen
overlays.tracks.addTo(map);

//21,SandraLeutner,Windegg - Matrei,Windegg,27 km,520 m,3 h,mittelschwierig,"Windegg, Ausgangspunkt und gleichzeit höchster Punkt dieser Tour, führt zur Gänze auf Asphaltstraßen bis nach Matrei am Brenner. Während der 27 Kilometer langen Tour genießen Sie nicht nur einen herrlichen Blick auf Innsbruck, sondern passieren auch die malerische Gemeinde Rinn mit ihrer bekannten Kirche, sowie die Orte Sistrans, Lans und Patsch.","Vom Gasthaus Windegg geht es über die Asphaltstraße hinunter nach Tulfes. Im Ort zweigt man links auf die Straße nach Rinn/Sistrans ab. Leicht auf und ab verläuft die Strecke durch Wiesen und Felder nach Rinn bis zum Kreisverkehr vor Sistrans. Hier zweigt man halblinks ab und erreicht nach einem weiteren Kilometer das Dorf (1 Stunde ab Windegg). Kurz vor der Kirche beim Dorfcafe geht es rechts ab nach Lans, wo man sich im Dorf an den Wegweiser Igls hält und 70 Meter danach nach Patsch abzweigt. Nun folgt ein Anstieg bis zur Olympia Bob- und Rodelbahn. Fast eben geht es weiter bis zur Abzweigung nach Innsbruck. Hier fährt man geradeaus weiter, vorbei am Grünwalderhof und gleich danach links nach Patsch. Auf dieser Straße radelt man bis ins Etappenziel. Auf den Westhängen des Wipptals fährt man durch die Streusiedlung Ellbögen zwischen Wiesen und Wäldchen, bis man zuerst Pfons und kurz danach Matrei erreicht (2 Stunden ab Sistrans).",https://www.tirol.at/reisefuehrer/sport/radfahren/biketouren/a-bike-trail-tirol-windegg-matrei

const drawTrack = (nr) => {
    console.log('Track: ', nr);
};

const selectedTrack = 21;
drawTrack(selectedTrack);