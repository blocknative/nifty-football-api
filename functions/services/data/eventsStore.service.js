const _ = require('lodash');

const firestore = require('./firebase.service').firestore();

const {getNetwork} = require('nifty-football-contract-tools').contracts;

class EventsStoreService {

    async upsertEvent(network, eventData) {
        return firestore
            .collection('events')
            .doc(getNetwork(network))
            .collection('data')
            .doc(eventData.id)
            .set(eventData)
            .then(ref => {
                return ref.id;
            });
    }

}

module.exports = new EventsStoreService();
