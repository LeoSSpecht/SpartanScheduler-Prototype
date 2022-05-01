const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

const serviceAccount = require('/mnt/c/Users/sugui/Desktop/SpartaHack/server/secrets/key.json');
initializeApp({
    credential: cert(serviceAccount)
});

function save_times(lines,name){
    const db = getFirestore();
    const docRef = db.collection('schedules').doc(name);

    var all ={}
    for(var i = 0; i < lines.length; i++){
        var day = lines[i].schedule_day
        var schedule = lines[i].schedule
        all[day] = schedule;
    }
    docRef.set(all);

}

async function load_times(name,dates){
    const db = getFirestore();
    const docRef = db.collection('schedules').doc(name);
    const doc = await docRef.get();
    if (!doc.exists || !dates[0] in doc.data()) {
        console.log('No such document!');
    }
    // } else {
    //     console.log('Document data:', doc.data());
    // }
    
    var times = []
    for(var i = 0; i < dates.length; i++){
        times.push(doc.data()[dates[i]])
    }

    return times;
}

async function load_users(){
    var users = []
    const db = getFirestore();
    const docRef = db.collection('schedules')
    const fire_users = await docRef.get();
    // if (!fire_users.exists) {
    //     console.log('No such document!');
    // }

    fire_users.docs.forEach(doc => {
        users.push(doc.id);
      });
    return users;
}
module.exports = {save_times,load_times,load_users};