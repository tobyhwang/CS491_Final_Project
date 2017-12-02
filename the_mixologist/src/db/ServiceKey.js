import ServiceKey from '../db/key.json';

if (process.env.BROWSER) {
    throw new Error(
        'Do not import `config.js` from inside the client-side code.',
    );
}

export default {
    project_id: ServiceKey.project_id,

    //
    // List out the service keys for the services your app is using
    // -----------------------------------------------------------------------------

    datastore: {
        // User key is for when you only need to read/write to the existing Entities (models)
        gcpDatastoreUserServiceKeyPath: '/key.json',
    },
};