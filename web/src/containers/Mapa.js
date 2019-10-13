//https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

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
    //TODO: Usar as layers do google Maps
    //TODO: Resolver problema do height do container
    return (
        <Container maxWidth={false} fixed className={classes.container}>
            <Map center={center} zoom={13} className={classes.leafletMap}>
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