function initMap() {
    // var locations = [
    //     ['Bondi Beach', -33.890542, 151.274856, 0], //the name of the locaiton will be the title of the journal 
    //     ['Coogee Beach', -33.923036, 151.259052, 0], // the
    //     ['Cronulla Beach', -34.028249, 151.157507, 0],
    //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 0],
    //     ['Maroubra Beach', -33.950198, 151.259302, 0]
    // ];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4
    });
    map.setCenter(new google.maps.LatLng(41.850033, -87.6500523));

    var testFlightPlanCoordinates = [{ lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }];

    var flightPlanCoordinates = [];

    database.ref().on("child_added", function (snap) {
        entryKey = snap.key;
        //initialize  vars
        var title = snap.val().title;
        var content = snap.val().content;
        var city = snap.val().city;
        var lon = snap.val().lon;
        var lat = snap.val().lat;
        var temp = snap.val().temp;
        var w_condition = snap.val().w_coidtion;
        var iconBase = 'http://maps.google.com/mapfiles/kml/pal3';
        var icons = {
            journalEntry: {
                icon: iconBase + '/icon54.png'
            }
        };
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: map,
            icon: icons.journalEntry.icon
        });

        flightPlanCoordinates.push({ lat: parseFloat(lat), lng: parseFloat(lon) });

        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                // infowindow.setContent(title);
                // infowindow.open(map, marker);
                console.log(title); 
            }
        })(marker, title));
    });
    console.log(flightPlanCoordinates);
    console.log(testFlightPlanCoordinates);

    var testFlightPath = new google.maps.Polyline({
        path: testFlightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    testFlightPath.setMap(map);

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#00FF00',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });

    flightPath.setMap(map);

    // for (i = 0; i < locations.length; i++) {
    //     marker = new google.maps.Marker({
    //         position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //         map: map
    //     });
    //     google.maps.event.addListener(marker, 'click', (function (marker, i) {
    //         return function () {
    //             infowindow.setContent(locations[i][0]);
    //             infowindow.open(map, marker);
    //         }
    //     })(marker, i));
    // }
}