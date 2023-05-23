import { create } from 'zustand'
import { Contact } from '../models/contact';

interface CurrentContactStore {
  contact: Contact;
  setCurentContact: (newContact: Contact) => void;
}

const useCurrentContact = create<CurrentContactStore>((set) => ({
    contact:{uid:'',displayName:'',email:'', photoURL:'',threadId:''},
    setCurentContact: (newContact)=>set({contact:newContact})
}));

export default useCurrentContact;