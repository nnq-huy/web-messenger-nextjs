import { create } from 'zustand'
import { Contact } from '../models/contact';

interface CurrentContactStore {
  contact: Contact;
  set: (newContact: Contact) => void;
}

const useCurrentContact = create<CurrentContactStore>((set) => ({
    contact:{uid:'',displayName:'',email:'', photoURL:''},
    set: (newContact)=>set({contact:newContact})
}));

export default useCurrentContact;