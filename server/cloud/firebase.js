const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('/mnt/c/Users/sugui/Desktop/SpartaHack/server/secrets/key.json');

async function run(){
initializeApp({
    credential: cert(serviceAccount)
    });
    
    const db = getFirestore();
    const docRef = db.collection('users').doc('alovelace');
    await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
    });
}

run()