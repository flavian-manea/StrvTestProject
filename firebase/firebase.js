// Initializes Firebase 

require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccount = require('./serviceFirebaseAccountCredentials.json')

// fetches private key from environment variables
const privateKey = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)

// private key is added back to the required object (from where it has been removed)
const serviceAccountExt = {...serviceAccount, ...privateKey} 

const initializeFireBase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountExt)
    });
    return admin.firestore()
}

module.exports = initializeFireBase