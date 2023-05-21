export type Contact = {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    unread?:boolean;
    lastMessage?:string;
    lastMessageDate?:string;
    threadId?:string;
};