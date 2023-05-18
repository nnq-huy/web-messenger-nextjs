import {auth, db} from '@/config/firebase';
import { Contact } from '@/models/contact';
import { query, collection, onSnapshot } from "firebase/firestore";

const getContacts =()=>{
    const {uid} = auth.currentUser!;
    const contactsRef = collection(db,'users/'+uid+'/contacts');
    const q = query(contactsRef);
    let contacts :Array<Contact> = [];

    onSnapshot(q, (QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
            const personData = doc.data();
            const contact: Contact = {
                uid: personData['uid'],
                displayName: personData['displayName'],
                email: personData['email'],
                photoURL: personData['photoURL'],
                unread:personData['unread'],
                lastMessage:personData['lastMessage'],
                lastMessageDate:personData['lastMessageDate'],
            }
            contacts.push(contact);
        });
    });
    return contacts;
}

export default getContacts;