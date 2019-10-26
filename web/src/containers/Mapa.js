import * as React from 'react'
import { useCallback } from "react";
import { GoogleMap, KmlLayer, Marker, useLoadScript } from '@react-google-maps/api'

const options = {

}

export default function Mapa() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAFCWhrDp1Unfxx5TKCqlkEYx2xB5Tj-HU" // ,
        // ...otherOptions
    })

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
            id="marker-example"
            mapContainerStyle={{
                height: "90%",
                width: "100%"
            }}
            zoom={15}
            center={{
                lat: -19.919387,
                lng: - 44.080628
            }}
        >
            <KmlLayer
                url={`http://www.google.com/maps/d/u/4/kml?mid=1hx2bkGrTtsN6E7ttxSFBe0N5fDRk8xKw&lid=mWjduN2aIeo&ver=${Math.random()}`}
                options={{ preserveViewport: true }}
            />
        </GoogleMap>
    }

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? renderMap() : "<Spinner />"
}
