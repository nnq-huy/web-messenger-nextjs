//layout: conversations list, bottom send message
'use client'
import React, { useRef } from "react";
import useCurrentContact from "../../hooks/useCurrentContact";
import { Avatar } from "../Avatar";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import getMessages from "@/app/utils/actions/getMessages";
import useMessages from "@/app/hooks/useMessages";

export const ChatWindow = () => {
  const {contact} = useCurrentContact();
  const {messages, setMessages} = useMessages();
  const scroll = useRef<HTMLDivElement>(null);


  if(contact.threadId!=""){
    getMessages(contact.threadId!).then((value)=>{
      setMessages(value);
    }).catch((e)=>{
      //toast.error('Error loading messages: '+e)
  });
  }

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