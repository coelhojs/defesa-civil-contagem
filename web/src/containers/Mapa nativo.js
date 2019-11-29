//https://stackoverflow.com/questions/30057159/google-maps-api-v3-how-to-alert-marker-id-when-marker-is-clicked
import { GoogleMap, KmlLayer, Marker, useLoadScript } from '@react-google-maps/api';
import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import Spinner from '../components/spinner';
import { fetchAllOcorrencias } from '../customHooks/useChamados';
import { createMarkers } from '../customHooks/useMaps';

export default function Mapa() {
    const [markers, setMarkers] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAFCWhrDp1Unfxx5TKCqlkEYx2xB5Tj-HU" // ,
        // ...otherOptions
    })

    const fetchData = async () => {
        const response = await fetchAllOcorrencias();
        setMarkers(createMarkers(response.data));
    };

    useEffect(() => {
        fetchData();

        // Limpa a assinatura antes do componente deixar a tela
        return () => {
            setMarkers(null);
        }
    }, []);

    //const onLoad = useCallback(fetchData());
    //     async function onLoad(mapInstance) {
    //         const response = await fetchAllOcorrencias();
    //         setMarkers(createMarkers(response.data));
    // }
    // )

    const renderMap = () => {

        return <GoogleMap
            //onLoad={onLoad}
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

            {(markers) ? markers.map(marker => (
                <Marker
                    key={marker.id}
                    title={marker.tipo}
                    position={{
                        lat: marker.lat,
                        lng: marker.lng
                    }}
                />
            )) : null}

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
