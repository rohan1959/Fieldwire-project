console.log('connecting to cloud');
let GoogleCloudStorage = require('@google-cloud/storage');

let storage = GoogleCloudStorage({
    projectId: 'home-manager',
    keyFilename: 'keyfile.json'
});

let BUCKET_NAME = 'floorplans-store';
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
let floorplanBucket = storage.bucket(BUCKET_NAME);

function uploadFile(filepath, filename) {
    return floorplanBucket.upload(filepath, { public: true, destination: filename });
}

console.log('connecting to cloud');
module.exports = {
    uploadFile: uploadFile
};