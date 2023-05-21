import { Message } from '../../models/message';

interface ChatBubbleProps {
    message: Message;
    isLeft:boolean;
}
export const ChatBubble : React.FC<ChatBubbleProps> = ({message, isLeft})=>{
  const getTimeSinceMessageReceived = () =>{
    const receivedDate = message.timeStamp.toDate()
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - receivedDate.getTime();
  
    // Calculate the time difference in seconds, minutes, hours, and days
    const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  let result = '';
  
  if (days > 0) {
    result = days + ' day' + (days > 1 ? 's' : '') +' ago';
  } else if (hours > 0) {
    result = (hours % 24) + ' hour' + (hours % 24 > 1 ? 's' : '')+' ago';
  } else if (minutes > 0) {
    result = (minutes % 60) + ' minute' + (minutes % 60 > 1 ? 's' : '') +' ago';
  } else {  result = (seconds % 60) + ' second' + (seconds % 60 > 1 ? 's' : '')+' ago';
}
  
  
  return result;
    

  }
  
  const timeSinceMessageReceived: string = getTimeSinceMessageReceived();

   if (isLeft) {return (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div>
          <div className="bg-white dark:bg-gray-500 p-3 rounded-r-lg shadow rounded-bl-lg">
            <p className="text-sm text-gray-800 dark:text-gray-100">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{timeSinceMessageReceived}</span>
        </div>
        </div>
    );} else {return(
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-indigo-600 text-white p-3 rounded-l-lg shadow rounded-br-lg">
            <p className="text-sm">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{timeSinceMessageReceived}</span>
        </div>
      </div>
    )}

}
