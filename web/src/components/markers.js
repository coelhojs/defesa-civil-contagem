import { InfoWindow, Marker } from '@react-google-maps/api';
import * as React from 'react';
import { useEffect, useState } from "react";
import { fetchAllOcorrencias } from '../customHooks/useChamados';
import { createMarkers } from '../customHooks/useMaps';

export default function Markers(props) {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllOcorrencias();
            setMarkers(createMarkers(response.data));
        };
        fetchData();
    }, []);


    if (markers && markers.length > 0) {
        return (
            markers.map(marker => (
                <Marker
                    key={marker.id}
                    title={marker.tipo}
                    position={{
                        lat: marker.lat,
                        lng: marker.lng
                    }}
                    onClick={((Click) => console.log(marker.id))}
                >

                    <InfoWindow
                        position={{ lat: marker.lat, lng: marker.lng }}
                    >
                        <div style={{
                            background: `white`,
                            border: `1px solid #ccc`,
                            padding: 15,
                            fontSize: `1rem`
                        }}>
                            <h1>{marker.tipo}</h1>
                        </div>
                    </InfoWindow>
                    </Marker >
                    ))
                )
    } else {
        return null;
                                                                        }
                                                                    }
