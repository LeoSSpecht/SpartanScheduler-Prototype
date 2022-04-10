const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('/mnt/c/Users/sugui/Desktop/SpartaHack/server/secrets/key.json');
initializeApp({
    credential: cert(serviceAccount)
});

function save_times(lines,name){
    const db = getFirestore();
    // var batch = db.batch();
    const docRef = db.collection('schedules').doc(name);

    var all ={}
    for(var i = 0; i < lines.length; i++){
        var day = lines[i].schedule_day
        var schedule = lines[i].schedule
        all[day] = schedule;
    }
    docRef.set(all);

}
module.exports = {save_times};