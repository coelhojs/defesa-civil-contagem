export const createMarkers = (chamados) => {
    let markersArray = [];

    try {
        chamados.forEach(element => {
            markersArray.push({
                id: element.id,
                tipo: element.tipo,
                lat: parseFloat(element.coordenadas.lat),
                lng: parseFloat(element.coordenadas.lng)
            })
        });
        return markersArray;

    } catch (e) {
        console.error(e)
    }
};
