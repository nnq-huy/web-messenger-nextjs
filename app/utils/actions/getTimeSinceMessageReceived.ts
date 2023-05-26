import { Timestamp } from "firebase/firestore";

const getTimeSinceMessageReceived = (timeStamp : Timestamp) =>{
    if(timeStamp){
    const receivedDate = timeStamp.toDate()
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
    } else {
      result = ' a moment ago';
      }
    return result;
    } else {return""}
}

export default getTimeSinceMessageReceived;