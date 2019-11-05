const OneSignal = require('onesignal-node');

var myClient = new OneSignal.Client({
    userAuthKey: 'MDVjNDg0YjEtZTg4Mi00YzY1LTljMjgtYTcxMGQ4YzQ0YjI3',
    app: {
        appAuthKey: 'YzI3MWI2NjUtN2YzMS00NzBmLWE4YzEtODk1ZWFmNDMyZjZl',
        appId: '122af564-4e53-4b67-9abd-e1b6232c05f7'
    }
});

module.exports = {
    myClient: myClient,
    OneSignal: OneSignal
}
