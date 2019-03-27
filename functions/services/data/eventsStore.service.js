const _ = require('lodash');

const firestore = require('./firebase.service').firestore();

class EventsStoreService {

    async upsertEvent(network, eventData) {
        return firestore
            .collection('events')
            .doc(network)
            .collection('data')
            .doc(eventData.id)
            .set(eventData)
            .then(ref => {
                return ref.id;
            });
    }

}

module.exports = new EventsStoreService();