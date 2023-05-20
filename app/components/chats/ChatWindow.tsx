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

export const ChatWindow = () => {
  const {contact} = useCurrentContact();
  const {user}=useAuth();
  const mockMessage:Message = {
    uid: "",
    content: "hello",
    from: "",
    to: "",
    timeStamp: "",
    isPicture: false
  }
  

  if(contact.uid!='') {return (
    <div className="flex w-full flex-col justify-between dark:bg-gradient-to-b from-gray-900 to-gray-600 p-2">
      <div className="flex justify-start items-center w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg">
        <div className="p-2"><Avatar photoURL={contact.photoURL}/></div>
        <p className=" text-gray-800 dark:text-gray-200">{contact.displayName}</p>
        </div>
        <div className="flex flex-col p-4 overflow-auto">
          <ChatBubble message={mockMessage} isLeft={true}/>
          <ChatBubble message={mockMessage} isLeft={false}/>
      </div>
      <ChatInput/>
    </div>
    );} else return (
        <div className="flex w-full justify-center items-center text-gray-500">
          please select a conversation to view
        </div>
    )
}