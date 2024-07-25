import instance from "./config";

const tripsApi = {
    createOneWayTrip: (data) => instance.post(`/trips/onewayTrip`, data),
    getOneWayTrips: () => instance.get(`/trips/onewayTrip/getall`),
    deleteOneWayTrip: (tripId) => instance.delete(`/trips/onewayTrip/${tripId}`),
    updateOneWayTrip: (tripId, data) => instance.put(`/trips/onewayTrip/${tripId}`, data),
    oneWayTripReadById: (tripId) => instance.get(`/trips/onewayTrip/${tripId}`),



    // round trip
    createRoundTrip: (data) => instance.post(`/trips/roundTrip`, data),
    getRoundTrips: () => instance.get(`/trips/roundTrip/getall`),
    deleteRoundTrip: (tripId) => instance.delete(`/trips/roundTrip/${tripId}`),
    updateRoundTrip: (tripId, data) => instance.put(`/trips/roundTrip/${tripId}`, data),
    roundTripReadById: (tripId) => instance.get(`/trips/roundTrip/${tripId}`),
    // local trip
    createLocalTrip: (data) => instance.post(`/trips/localTrip`, data),
    getLocalTrips: () => instance.get(`/trips/localTrip/getall`),
    deleteLocalTrip: (tripId) => instance.delete(`/trips/localTrip/${tripId}`),
    updateLocalTrip: (tripId, data) => instance.put(`/trips/localTrip/${tripId}`, data),
    localTripReadById: (tripId) => instance.get(`/trips/localTrip/${tripId}`),
    // transfer trip
    createTransferTrip: (data) => instance.post(`/trips/transferTrip`, data),
    getTransferTrips: () => instance.get(`/trips/transferTrip/getall`),
    deleteTransferTrip: (tripId) => instance.delete(`/trips/transferTrip/${tripId}`),
    updateTransferTrip: (tripId, data) => instance.put(`/trips/transferTrip/${tripId}`, data),
    transferTripReadById: (tripId) => instance.get(`/trips/transferTrip/${tripId}`),


};

export default tripsApi;