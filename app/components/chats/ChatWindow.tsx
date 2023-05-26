//layout: conversations list, bottom send message
'use client'
import React, { useEffect, useRef } from "react";
import useCurrentContact from "../../hooks/useCurrentContact";
import { Avatar } from "../Avatar";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import useMessages from "@/app/hooks/useMessages";
import toast from "react-hot-toast";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { Message } from "@/app/models/message";
import { BsThreeDotsVertical } from "react-icons/bs";

export const ChatWindow = () => {
  const {contact} = useCurrentContact();
  const {messages, setMessages} = useMessages();
  const scroll = useRef<HTMLDivElement>(null);

useEffect(()=>{
  const messagesRef = collection(db,'messages');
  const q = query(messagesRef, where("threadId", "==", contact.threadId),orderBy("timeStamp","asc"));
  onSnapshot(q, (QuerySnapshot)=>{
    let messagesList :Array<Message> = [];
      QuerySnapshot.forEach((value)=>{
          const messageData = value.data();
      const message: Message = {
          threadId: messageData['threadId'],
          content: messageData['content'],
          from: messageData['from'],
          to: messageData['to'],
          timeStamp: messageData['timeStamp'],
          isPicture: messageData['isPicture'],
          id:value.id
      }
      messagesList.push(message);
      })
      setMessages(messagesList);
      setTimeout(()=>  scroll.current?.scrollIntoView({behavior:"auto"}),100)
  },
    (e)=>{
      if (e.code!='permission-denied'){toast.error('Cannot load messages: '+e.message)}},
    );
  return ()=>{}
},[contact.threadId, setMessages])

  if(contact.uid!='') {return (
    <div className="flex w-full flex-col justify-between dark:bg-gradient-to-b from-gray-900 to-gray-600 p-2">
      <div className="flex justify-between items-center w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg">
        <div className="p-2 flex items-center">
          <Avatar photoURL={contact.photoURL}/>
          <div>
          <p className="font-semibold text-gray-800 dark:text-gray-200 px-2">{contact.displayName}</p>
          <p className="text-sm text-gray-800 dark:text-gray-200 px-2">{contact.email}</p>

          </div>
        </div>
          <button className="px-2 text-xl text-gray-700 dark:text-gray-200">
            {<BsThreeDotsVertical/>}
          </button>
        </div>

        <div className="flex flex-col p-4 overflow-auto">
          <ul>
            {messages.map((message)=>(
              <li key={message.id}>
                {message.from==contact.uid?<ChatBubble  message={message} isLeft={true}/>:<ChatBubble message={message} isLeft={false}/>}
              </li>
            ))}
          </ul>
          <span ref={scroll}></span>
      </div>
      <ChatInput scroll={scroll} />
    </div>
    );} else return (
        <div className="flex w-full justify-center items-center text-gray-500">
          please select a conversation to view
        </div>
    )
}