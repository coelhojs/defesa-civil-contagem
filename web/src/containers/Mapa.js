//https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";

function Map() {
    const style = {
        width: "300px",
        height: "300px"
    };

    const [markersData, setMarkersData] = useState([
        { latLng: { lat: -19.919387, lng: -44.080628 }, title: 1 }
    ]);

    function addMarker() {
        const lastMarker = markersData[markersData.length - 1];

        setMarkersData([
            ...markersData,
            {
                title: +lastMarker.title + 1,
                latLng: {
                    lat: lastMarker.latLng.lat + 0.0001,
                    lng: lastMarker.latLng.lng + 0.0001
                }
            }
        ]);
    }

    // create map
    const mapRef = useRef(null);
    useEffect(() => {
        mapRef.current = L.map("map", {
            center: [49.8419, 24.0315],
            zoom: 16,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });
    }, []);

    // add layer
    const layerRef = useRef(null);
    useEffect(() => {
        layerRef.current = L.layerGroup().addTo(mapRef.current);
    }, []);

    // update markers
    useEffect(
        () => {
            layerRef.current.clearLayers();
            markersData.forEach(marker => {
                L.marker(marker.latLng, { title: marker.title }).addTo(
                    layerRef.current
                );
            });
        },
        [markersData]
    );

    return <div id="map" style={style} />;
}

export default Map;