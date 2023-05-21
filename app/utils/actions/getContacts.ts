import { db, auth } from "@/app/config/firebase";
import { Contact } from "@/app/models/contact";
import { getDocs, collection } from "firebase/firestore";

const getContacts= async()=>{
    const {uid} = auth.currentUser!;
    let contactList :Array<Contact> = [];
    const data = await getDocs(collection(db,'users/'+uid+'/contacts'));
    data.forEach((value)=>{
        const personData = value.data();
        const contact: Contact = {
            uid: personData['uid'],
            displayName: personData['displayName'],
            email: personData['email'],
            photoURL: personData['photoURL'],
            unread:personData['unread'],
            lastMessage:personData['lastMessage'],
            lastMessageDate:personData['lastMessageDate'],
            threadId:personData['threadId']
        }
        contactList.push(contact);
    })
    return contactList;
}
export default getContacts;