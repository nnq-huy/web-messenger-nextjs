import { Timestamp } from "firebase/firestore";

export type Message = {
    threadId:string,
    content: string;
    from: string;
    to: string;
    timeStamp:Timestamp;
    isPicture:boolean;
    id?:string;
};