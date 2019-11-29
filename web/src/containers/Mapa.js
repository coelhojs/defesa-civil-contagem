//https://github.com/fullstackreact/google-maps-react
import { GoogleMap, InfoWindow, KmlLayer, Marker, useLoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { useEffect, useState } from "react";
//import Markers from '../components/markers';
import Spinner from '../components/spinner';
import { fetchAllOcorrencias } from '../customHooks/useChamados';
import { createMarkers } from '../customHooks/useMaps';

export default function Mapa() {
    const [markers, setMarkers] = useState([]);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState(null)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAFCWhrDp1Unfxx5TKCqlkEYx2xB5Tj-HU" // ,
        // ...otherOptions
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllOcorrencias();
            setMarkers(createMarkers(response.data));
        };
        fetchData();
    }, []);

    const onMarkerClick = (props, marker, e) => {
        setPosition(props.latLng);
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    }

    const onMapClicked = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    const renderMap = () => {
        // wrapping to a function is useful in case you want to access `window.google`
        // to eg. setup options or create latLng object, it won't be available otherwise
        // feel free to render directly if you don't need that
        // const onLoad = useCallback(
        //     function onLoad(mapInstance) {
        //         // do something with map Instance
        //     }
        // )
        return <GoogleMap
            onClick={onMapClicked}
            mapContainerStyle={{
                height: "90%",
                width: "100%"
            }}
            zoom={12}
            center={{
                lat: -19.919387,
                lng: - 44.080628
            }}
        >
            {/* <Markers /> */}

            {markers.map(marker => (
                <Marker
                    key={marker.id}
                    title={marker.tipo}
                    position={{
                        lat: marker.lat,
                        lng: marker.lng
                    }}
                    onClick={onMarkerClick}
                />
            ))}
            {(selectedPlace) ?
                <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}
                    position={position}
                >
                    <div style={{
                        background: `white`,
                        border: `1px solid #ccc`,
                        padding: 15,
                        fontSize: `1rem`
                    }}>
                        <h1>{selectedPlace.tipo}</h1>
                    </div>
                </InfoWindow>
                : ""
            }}
            <KmlLayer
                url={`http://www.google.com/maps/d/u/4/kml?mid=1hx2bkGrTtsN6E7ttxSFBe0N5fDRk8xKw&lid=mWjduN2aIeo&ver=${Math.random()}`}
                options={{ preserveViewport: true }}
            />
        </GoogleMap >
    }

    if (loadError) {
        return <div>Houve um problema no carregamento do mapa. Tente novamente em alguns instantes.</div>
    }

    if (isLoaded) {
        return (
            <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1FoPYN3YEQcsF6rn_j7-0iVYF6K4e-24F&t=m&msa=b" width="100%" height="89%"></iframe>
        )
    } else {
        return <Spinner />
    }
}
