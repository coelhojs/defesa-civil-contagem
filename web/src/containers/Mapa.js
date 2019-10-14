//https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { GeoJSON, Map, Marker, Popup, TileLayer, } from "react-leaflet";
import { mapaContagem } from "../map"

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        maxWidth: '100%',
        paddingLeft: '0',
        paddingRight: '0',
    },
    leafletMap: {
        height: '100%',
        width: '100%'
    }
}));

export default function Mapa() {
    const classes = useStyles();
    const center = [-19.9192192, -44.0927953];

    function getGeoJson() {
        return mapaContagem
    }

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
        }
    }

    function setStyles(feature) {
        if (feature.properties.RO) {
            return { fillColor: "#FF0000" }
        }
        return { fillColor: "#FF0000" }
    }
    //TODO: Usar as layers do google Maps
    //TODO: Resolver problema do height do container
    return (
        <Container maxWidth={false} fixed className={classes.container}>
            <Map center={center} zoom={13} className={classes.leafletMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <TileLayer url='http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxZoom={20}
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                /> */}
                <GeoJSON data={getGeoJson()} style={setStyles} onEachFeature={onEachFeature} />
            </Map>
        </Container>
    )
}