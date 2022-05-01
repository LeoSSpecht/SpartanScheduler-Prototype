import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection,setDoc, doc, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvjMepD9a8-0d3MRL_rI_cvJGs4Rixcf0",
  authDomain: "spartanschedulesr.firebaseapp.com",
  databaseURL: "https://spartanschedulesr-default-rtdb.firebaseio.com",
  projectId: "spartanschedulesr",
  storageBucket: "spartanschedulesr.appspot.com",
  messagingSenderId: "319384211035",
  appId: "1:319384211035:web:fa8578d6e233e49014f97e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function getUser(id){
  let is_new_user = true;
  const colect = collection(db, "Users");
  const allDocs = await getDocs(colect);
  allDocs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if(doc.id === id){
      is_new_user = false;
    }
  });
  return is_new_user;
}

async function addValue(id){
    const is_new_user = getUser(id).then(async (res) => {
      if(res){
        const added = await setDoc(doc(db, "Users", id), {
          role: "student"
        })
        return added;
      }
      else{
        return Promise;
      }
    });
    return is_new_user;
}

function signIn(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let uid = user.uid;
    } else {
      console.log("User not loged");
    }
  });

  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  signInWithPopup(auth, provider).then((res) => {
    addValue(res.user.uid).then((e) => {
      window.location.replace("http://localhost:3000")
    })
  });
}

export {signIn, auth, db};