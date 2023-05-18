//layout: conversations list, bottom send message

import React from "react";
import Image from "next/image";
import { BsEmojiSmile, BsImage, BsSend } from "react-icons/bs";

export const ChatWindow = () => {
    return (
    <div className="flex w-full flex-col justify-between">
      <div className="flex flex-col p-4 overflow-auto">

        <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full shadow bg-gray-200 "></div>
        <div>
          <div className="bg-gray-200 dark:bg-gray-500 p-3 rounded-r-lg shadow rounded-bl-lg">
            <p className="text-sm text-gray-800 dark:text-gray-100">Chat left</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">15 min ago</span>
        </div>
        </div>

        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-indigo-600 text-white p-3 rounded-l-lg shadow rounded-br-lg">
            <p className="text-sm">chat right</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">1 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full shadow bg-gray-300"></div>
      </div>
      
      </div>

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
    </div>
    );
}