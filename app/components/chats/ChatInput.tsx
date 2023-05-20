import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";

interface ChatInputProps {
    onClick?:()=>void;
}
export const ChatInput : React.FC<ChatInputProps> = ({onClick})=>{
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

