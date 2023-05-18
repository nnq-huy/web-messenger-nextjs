import React from "react";
import Image from "next/image";
import { BsPersonAdd } from "react-icons/bs";
import AuthSocialButton from "./form-components/AuthSocialButton";
import { useRouter } from "next/router";
import { ADD_CONTACT } from "@/utils/constant/routes.constant";

export const ContactList = ()=>{
    //const contactsRef = collection(db,'users/'+user.uid+'/contacts');

    const router = useRouter();

    const list = [
        {
          id:1,
          name: "Mia John",
          lastMessage:"hello!",
          unread:true
        },
        {
          id:2,
          name: "Arthur P",
          lastMessage:"see you...",
          unread:false
        },
        {
          id:3,
          name: "John Smith",
          lastMessage:"nice to meet you, hope to see you again soon...",
          unread:false
        },
        {
          id:4,
          name: "Chris L",
          lastMessage:"moi",
          unread:true
        },
        {
          id:5,
          name: "Adam M",
          lastMessage:"hei",
          unread:false
        },
        {
          id:6,
          name: "Malcolm X",
          lastMessage:"kiitos",
          unread:false
        },
    ]
    return (
        <div>
            <aside className="flex">
                <div className="h-screen py-8 overflow-y-auto bg-gray-200 sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
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
                            {list.map((person)=>(
                            <li key={person.id}>
                                <div className=" relative flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-700 gap-x-2 hover:bg-gray-100 focus:outline-none">
                                    <div className="shrink-0">
                                        <Image
                                            alt="profile picture"
                                            height="64"
                                            width="64"
                                            className="object-cover w-12 h-12 rounded-full"
                                            src={'/images/avatar.webp'}
                                        />
                                    </div>
                                    <div className="truncate text-left rtl:text-right">
                                        <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{person.name}</h1>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{person.lastMessage}</span>
                                    </div>
                                    {person.unread?<span className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-green-800 absolute right-2 top-6 ring-1 ring-white dark:ring-gray-200 bottom-0"></span>
                                    :<></>}
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    );
}