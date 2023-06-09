'use client'
import { BsPersonAdd } from "react-icons/bs";
import AuthSocialButton from "./form-components/AuthSocialButton";
import { useRouter } from "next/navigation";
import { auth, db } from "../config/firebase";
import { ADD_CONTACT } from "../utils/constant/routes.constant";
import useCurrentContact from "../hooks/useCurrentContact";
import { Avatar } from "./Avatar";
import useContacts from "../hooks/useContacts";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Contact } from "../models/contact";
import getTimeSinceMessageReceived from "../utils/actions/getTimeSinceMessageReceived";

export const ContactList = ()=>{

    const router = useRouter();
    const {contacts, setContacts} = useContacts();
    const {contact, setCurentContact} = useCurrentContact();
    const {uid} = auth.currentUser!;

    useEffect(()=>{
        const q = query(collection(db,'users/'+uid+'/contacts'));
        onSnapshot(q, (QuerySnapshot)=>{
            let contactList :Array<Contact> = [];
            QuerySnapshot.forEach((value)=>{
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
            setContacts(contactList);
        },
          (e)=>{
            if (e.code!='permission-denied'){toast.error('Cannot load contacts: '+e.message)}},
          );
        return ()=>{}
    },[uid, setContacts])

    return (
        <div className="flex">
            <div className="py-8 overflow-y-auto shadow-lg bg-gray-200 w-20 sm:w-20 md:w-64 dark:bg-gradient-to-b from-gray-800 to-gray-500  dark:border-gray-700">
                <div className="flex px-5 py-2 justify-between">
                    <h2 className="overflow-hidden -z-10 sm:-z-10 md:z-0 sm:p-0 md:px-5 text-lg font-medium text-gray-600 dark:text-white">Contacts</h2>
                    <AuthSocialButton
              	        icon={BsPersonAdd}
              	        onClick={() => {
                            router.push(ADD_CONTACT);
                        }}
            	    />
                </div>
                <div className="mt-4 space-y-4">
                    <ul>
                        {contacts.map((person)=>(
                        uid!=person.uid?
                        <li key={person.uid}>
                            <button
                                className="relative flex items-center w-full px-3 py-2 dark:hover:bg-gray-700 gap-x-2 hover:bg-gray-100 focus:outline-none"
                                onClick={()=>setCurentContact(person)}
                            >
                                <Avatar photoURL={person.photoURL}/>
                                <div className=" hidden md:block md:w-2/3 text-left rtl:text-right">
                                    <h1 className="truncate text-sm font-semibold text-gray-700 capitalize dark:text-white">{person.displayName}</h1>
                                    <>
                                    <div className="truncate text-xs text-gray-500 dark:text-gray-400">{person.lastMessage}</div>
                                    <div className=" text-[10px] text-gray-500 dark:text-gray-400">{getTimeSinceMessageReceived(person.lastMessageDate!)}</div>
                                    </>
                                </div>
                                {person.unread?<span className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-green-800 absolute right-2 top-6 ring-1 ring-white dark:ring-gray-200 bottom-0"></span>
                                :<></>}
                            </button>
                        </li> :<></>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}