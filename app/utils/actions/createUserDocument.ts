import {auth, db} from '@/app/config/firebase';
import {setDoc, doc} from 'firebase/firestore';


const createUserDocument = async (userName?:string)=>{
    const {uid, email, displayName, photoURL} = auth.currentUser!;

    const user = {
        displayName: displayName ?? userName,
        email:email ?? '',
        uid: uid ?? '',
        photoURL: photoURL ??'',
    }
    await setDoc(doc(db,"users/"+uid),user,{ merge: true });
}

export default createUserDocument;