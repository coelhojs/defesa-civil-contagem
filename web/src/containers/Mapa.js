//https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles(theme => ({
    leafletContainer: {
        height: '400px',
        width: '80%',
        margin: '0 auto',
    }

}));

export default function Mapa() {
    const classes = useStyles();
    const center = [51.505, -0.09];
    return (
        <Map center={center} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
                <Popup>A simple popup</Popup>
            </Marker>
        </Map>
    )
}
