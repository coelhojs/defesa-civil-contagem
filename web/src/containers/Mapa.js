import { GoogleMap, InfoWindow, KmlLayer, Marker, useLoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { useEffect, useState } from "react";
//import Markers from '../components/markers';
import Spinner from '../components/spinner';
import { fetchAllChamados } from '../customHooks/useChamados';
import { createMarkers } from '../customHooks/useMaps';

export default function Mapa() {
    const [markers, setMarkers] = useState([]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAFCWhrDp1Unfxx5TKCqlkEYx2xB5Tj-HU" // ,
        // ...otherOptions
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllChamados();
            setMarkers(createMarkers(response.data));
        };
        fetchData();
    }, []);

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
                />
            ))}

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
        return renderMap();
    } else {
        return <Spinner />
    }
}
