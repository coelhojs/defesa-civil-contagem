//https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const useStyles = makeStyles(theme => ({
    leafletContainer: {
        height: '400px',
        width: '100%'
    }
}));

export default function Mapa() {
    const classes = useStyles();
    const center = [51.505, -0.09];
    return (
        <Container maxWidth="lg" fixed>
            <Map center={center} zoom={13} className={classes.leafletContainer}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center}>
                    <Popup>A simple popup</Popup>
                </Marker>
            </Map>
        </Container>
    )
}