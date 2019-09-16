import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react'; import { makeStyles } from '@material-ui/core/styles';
import { geolocated } from "react-geolocated";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

}));


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    // https://maps.googleapis.com/maps/api/geocode/json?language=ja&sensor=false&latlng=35.6909389,139.6952959&key=AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div style={{ height: '100vh', width: '100%' }} >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg" }}
                    defaultCenter={[this.props.coords.latitude, this.props.coords.longitude]}
                    defaultZoom={11}
                >
                    <AnyReactComponent
                        lat={this.props.coords.latitude}
                        lng={this.props.coords.longitude}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div >
        ) : (
                        <div>Getting the location data&hellip; </div>
                    );
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Map);