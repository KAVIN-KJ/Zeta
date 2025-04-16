import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, query, updateDoc, where, getDocs } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyD7Awx15tZP_ZQ5D3eKKrclsKqRfAwp1Z8",
  authDomain: "code-zeta.firebaseapp.com",
  projectId: "code-zeta",
  storageBucket: "code-zeta.firebasestorage.app",
  messagingSenderId: "536968611907",
  appId: "1:536968611907:web:4f5ebced76c383aa162cf6",
  measurementId: "G-0MNYS2918M"
};



export const googleAuth = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const collectionRef = collection(db,"zeta");



export const addDocument = async(data)=>{
    try{
        const uid = data.uid;
        if (!uid) throw new Error("UID is required")
        
        const q = query(collectionRef,where("uid","==",uid));

        const queryDoc = await getDocs(q)

        if(queryDoc.empty){
            await addDoc(collectionRef,data);
            console.log("Added")
        }
        else{
            const docref = queryDoc.docs[0].ref;
            await updateDoc(docref,data);
            console.log("Updated")
        }        
    }
    catch(e){
        console.error(e)
    }
}
export {app,auth,db}