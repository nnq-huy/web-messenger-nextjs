'use client'
import React, { useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import AuthSocialButton from "./form-components/AuthSocialButton";
import { useRouter } from "next/navigation";
import { query, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Contact } from "../models/contact";
import { ADD_CONTACT } from "../utils/constant/routes.constant";
import useCurrentContact from "../hooks/useCurrentContact";
import { Avatar } from "./Avatar";

export const ContactList = ()=>{

    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const {contact, set} = useCurrentContact();
    const {uid} = auth.currentUser!;
    const contactsRef = collection(db,'users/'+uid+'/contacts');
    const q = query(contactsRef);
    

    onSnapshot(q, (QuerySnapshot) => {
        let contacts :Array<Contact> = [];
         const a = QuerySnapshot.docChanges();
         a.forEach((value)=>{
            const personData = value.doc.data();
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
         })
         setContacts(contacts);
    });

    return (
        <div className="flex">
            <div className="py-8 overflow-y-auto shadow-lg bg-gray-200 sm:w-0 md:w-60 w-60 dark:bg-gradient-to-b from-gray-800 to-gray-500  dark:border-gray-700">
                <div className="flex px-2 py-2 justify-between">
                    <h2 className="px-5 text-lg font-medium text-gray-600 dark:text-white">Contacts</h2>
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
                                className="relative flex items-center w-full px-5 py-2 dark:hover:bg-gray-700 gap-x-2 hover:bg-gray-100 focus:outline-none"
                                onClick={()=>set(person)}
                            >
                                <Avatar photoURL={person.photoURL}/>
                                <div className="truncate text-left rtl:text-right">
                                    <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{person.displayName}</h1>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{person.lastMessage}</span>
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