//layout: conversations list, bottom send message
'use client'
import React from "react";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";
import { Contact } from "../../models/contact";
import useCurrentContact from "../../hooks/useCurrentContact";
import { Avatar } from "../Avatar";
import { useAuth } from "../../context/AuthContext";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { Message } from "@/app/models/message";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import getMessages from "@/app/utils/actions/getMessages";
import useMessages from "@/app/hooks/useMessages";

export const ChatWindow = () => {
  const {contact} = useCurrentContact();
  const {messages, setMessages} = useMessages();


getMessages(contact.threadId??'').then((value)=>{
  setMessages(value);
});


  if(contact.uid!='') {return (
    <div className="flex w-full flex-col justify-between dark:bg-gradient-to-b from-gray-900 to-gray-600 p-2">
      <div className="flex justify-start items-center w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg">
        <div className="p-2"><Avatar photoURL={contact.photoURL}/></div>
        <p className=" text-gray-800 dark:text-gray-200">{contact.displayName}</p>
        </div>
        <div className="flex flex-col p-4 overflow-auto">
          <ul>
            {messages.map((message)=>(
              <li key={message.id}>
                {message.from==contact.uid?<ChatBubble  message={message} isLeft={true}/>:<ChatBubble message={message} isLeft={false}/>}
              </li>
            ))}
          </ul>
      </div>
      <ChatInput/>
    </div>
    );} else return (
        <div className="flex w-full justify-center items-center text-gray-500">
          please select a conversation to view
        </div>
    )
}