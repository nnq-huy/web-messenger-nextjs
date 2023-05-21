import { db } from "@/app/config/firebase";
import { Message } from "@/app/models/message";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";

const getMessages= async(threadId: string)=>{
    let messages :Array<Message> = [];
    const messagesRef = collection(db,'messages');
    const q = query(messagesRef, where("threadId", "==", threadId),orderBy("timeStamp","asc"));
    const data = await getDocs(q);
    data.forEach((value)=>{
        const messageData = value.data();
        const message: Message = {
            threadId: threadId,
            content: messageData['content'],
            from: messageData['from'],
            to: messageData['to'],
            timeStamp: messageData['timeStamp'],
            isPicture: messageData['isPicture'],
            id:value.id
        }
        messages.push(message);
    })
    return messages;
}
export default getMessages;