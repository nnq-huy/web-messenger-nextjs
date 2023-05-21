import { create } from 'zustand'
import { Message } from '../models/message';

interface MessagesStore {
  messages: Message[];
  setMessages: (newMessage: Message[]) => void;
}

const useMessages = create<MessagesStore>((set) => ({
    messages:[],
    setMessages: (newMessage)=>set({messages:newMessage})
}));

export default useMessages;