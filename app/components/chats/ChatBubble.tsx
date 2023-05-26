'use client'
import { Timestamp } from 'firebase/firestore';
import { Message } from '../../models/message';
import Image from 'next/image';
import getTimeSinceMessageReceived from '@/app/utils/actions/getTimeSinceMessageReceived';

interface ChatBubbleProps {
    message: Message;
    isLeft:boolean;
}
export const ChatBubble : React.FC<ChatBubbleProps> = ({message, isLeft})=>{

   if (isLeft) {return (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="justify-end">
          {message.isPicture?
            <div className="rounded-xl shadow"><Image width={300} height={300} src={message.content} alt={'picture message'}></Image></div>:
            <div className="bg-white dark:bg-gray-500 p-3 rounded-r-lg shadow rounded-bl-lg">
              <p className="text-sm text-gray-800 dark:text-gray-100">{message.content}</p>
            </div>}
          <p className=" pt-1 text-xs text-gray-500">{getTimeSinceMessageReceived(message.timeStamp)}</p>
        </div>
        </div>
    );} else {return(
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          {message.isPicture?
            <div className="rounded-xl shadow"><Image width={300} height={300} src={message.content} alt={'picture message'}></Image></div>:
            <div className="bg-indigo-600 text-white p-3 rounded-l-lg shadow rounded-br-lg">
              <p className="text-sm">{message.content}</p>
            </div>}
          <p className="text-end pt-1 text-xs text-gray-500 leading-none">{getTimeSinceMessageReceived(message.timeStamp)}</p>
        </div>
      </div>
    )}

}
