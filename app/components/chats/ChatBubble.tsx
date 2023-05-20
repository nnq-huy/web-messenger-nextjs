import { Contact } from '@/app/models/contact';
import { BsPersonAdd } from 'react-icons/bs';
import { Avatar } from '../Avatar';
import { Message } from '../../models/message';

interface ChatBubbleProps {
    message: Message;
    isLeft:boolean;
}
export const ChatBubble : React.FC<ChatBubbleProps> = ({message, isLeft})=>{
   if (isLeft) {return (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div>
          <div className="bg-white dark:bg-gray-500 p-3 rounded-r-lg shadow rounded-bl-lg">
            <p className="text-sm text-gray-800 dark:text-gray-100">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">15 min ago</span>
        </div>
        </div>
    );} else {return(
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-indigo-600 text-white p-3 rounded-l-lg shadow rounded-br-lg">
            <p className="text-sm">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">1 min ago</span>
        </div>
      </div>
    )}

}
