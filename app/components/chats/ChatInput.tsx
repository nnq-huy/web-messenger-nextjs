'use client'
import { db } from "@/app/config/firebase";
import { useAuth } from "@/app/context/AuthContext";
import useCurrentContact from "@/app/hooks/useCurrentContact";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";
import { toast } from "react-hot-toast";

interface ChatInputProps {
    onClick?:()=>void;
}
export const ChatInput : React.FC<ChatInputProps> = ({onClick})=>{
  const {user}=useAuth();
  const {contact} = useCurrentContact();
  const [message, setMessage] = useState("");

  const sendMessage = async () =>{

    if (message.trim()===""){
      toast.error('please enter an message...')
      return
    }else {
      try {
        await addDoc(collection(db,"messages"), {
        threadId:contact.threadId,
        content: message,
        from: user.uid,
        to: contact.uid,
        timeStamp: serverTimestamp(),
        isPicture: false
      });
      setMessage("");
      } catch(e) {toast.error('Cannot send message: '+e)}
    }
  }
return (
<div className="flex flex-row items-center h-16 rounded-xl shadow-xl bg-white dark:bg-gray-600 w-full px-4">
        <div>
          <button
            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            { <BsImage/>}
          </button>
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
                <input
                  title="chat"
                  type="text"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  className="bg-gray-50  dark:bg-gray-300 flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  {<BsEmojiSmile/>}
                </button>
            </div>
            </div>
            <div className="ml-4">
              <button
              onClick={sendMessage}
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                {<BsSend/>}
                </span>
              </button>
            </div>
      </div>
)}

