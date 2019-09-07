import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Loader from "./loader";
// const Geolocation = require('../controllers/Geolocation');

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = { center: this.getLocation() };
    }

    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                return center;

            });
        } else {
            return "Localização desabilitada pelo usuário";
        }
    }

    // https://maps.googleapis.com/maps/api/geocode/json?language=ja&sensor=false&latlng=35.6909389,139.6952959&key=AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg

    // static defaultProps = {
    //     center: {
    //         lat: 59.95,
    //         lng: 30.33
    //     },
    //     zoom: 11
    // };

    render() {
        console.log(this.state);
        
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }} >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg" }}
                    defaultCenter={this.state.center}
                    defaultZoom={11}
                >
                    <AnyReactComponent
                        lat={this.lat}
                        lng={this.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div >
        );
    }
}

export default Map;