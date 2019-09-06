import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Geolocation from '../controllers/Geolocation';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static async getInitialProps() {
        // if( navigator.geolocation ) {
        //
        // }
        const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?language=ja&sensor=false&latlng=35.6909389,139.6952959&key=AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg')
        const data = await res.json()

        console.log(data)
        console.log(data.results[0].formatted_address)
        return { address: data.results[0].address_components[3].long_name }
    }

    // static defaultProps = {
    //     center: {
    //         lat: 59.95,
    //         lng: 30.33
    //     },
    //     zoom: 11
    // };
    componentDidMount() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log({ lat: position.coords.latitude, lng: position.coords.longitude });
                let center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
            });
        }
    }
    render() {

        // this.props.geolocation = navigator.geolocation.getCurrentPosition(showPosition);

        // function showPosition(position) {
        //     return position.coords;
        // }

        console.log(this.props);
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }} >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDrud8AunST8uTxV0K7df50dFjnM59kbBg" }}
                    defaultCenter={this.center}
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