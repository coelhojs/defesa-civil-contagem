export default class Geolocation {
    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers['user-agent'] : navigator
        console.log(userAgent);
        
        return { userAgent }
    }
    
    static getLocation() {
        console.log(this.props);
        
        this.props.geolocation.getCurrentPosition(returnLocation);
    }

    returnLocation(position) {
        return position.coords;
    }
}