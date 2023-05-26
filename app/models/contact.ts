import { Timestamp } from "firebase/firestore";

export type Contact = {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    unread?:boolean;
    lastMessage?:string;
    lastMessageDate?:Timestamp;
    threadId?:string;
};