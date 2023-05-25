'use client'
import { db, storage } from "@/app/config/firebase";
import { useAuth } from "@/app/context/AuthContext";
import useCurrentContact from "@/app/hooks/useCurrentContact";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";
import { toast } from "react-hot-toast";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


interface ChatInputProps {
  scroll:React.RefObject<HTMLDivElement>
}
export const ChatInput : React.FC<ChatInputProps> = ({scroll})=>{
  const {user}=useAuth();
  const {contact} = useCurrentContact();
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const inputFile = useRef(null);



  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
    setShowEmojis(!showEmojis);
  };
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
      scroll.current?.scrollIntoView({behavior:"smooth"});
      } catch(e) {toast.error('Cannot send message: '+e)}
    }
  }
  const uploadImage = (e:any)=>{
    const file = e.target.files[0];
    if (!file) return;

    const imagesRef = ref(storage, "images/"+file.name);
    const uploadTask = uploadBytesResumable(imagesRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          toast.error("User doesn't have permission to access the storage")
        // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          toast.error("User canceled the upload")
          // User canceled the upload
          break;
        case 'storage/unknown':
          toast.error("Error occured!")
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        toast.success("Image uploaded");
        sendImage(downloadURL);
      });
    }
);
  }

  const openFileDialog = () => {
    const { current } = inputFile;
    (current || { click: () => {}}).click();
  };

  const sendImage = async (url:string)=>{
    try {
      await addDoc(collection(db,"messages"), {
      threadId:contact.threadId,
      content: url,
      from: user.uid,
      to: contact.uid,
      timeStamp: serverTimestamp(),
      isPicture: true
    });
    setMessage("");
    scroll.current?.scrollIntoView({behavior:"smooth"});
    } catch(e) {toast.error('Cannot send image: '+e)}
  }

return (
  <div>
<div className="flex flex-row items-center h-16 rounded-xl shadow-xl bg-white dark:bg-gray-600 w-full px-2">
        <div> <input type="file" accept="image/*" id='file' ref={inputFile} onChange={uploadImage} className="hidden"/>
          <button
            onClick={openFileDialog}
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
                  onClick={() => setShowEmojis(!showEmojis)}
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
      {showEmojis && (
        <div>
    <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
      </div>
)}

