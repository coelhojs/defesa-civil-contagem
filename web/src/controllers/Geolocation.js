function getLocation() {
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


module.exports = {
    getLocation: getLocation
};