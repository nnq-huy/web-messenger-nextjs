import { create } from 'zustand'
import { Contact } from '../models/contact';

interface ContactsStore {
  contacts: Contact[];
  setContacts: (newContact: Contact[]) => void;
}

const useContacts = create<ContactsStore>((set) => ({
    contacts:[{uid:'',displayName:'',email:'', photoURL:'',threadId:''}],
    setContacts: (newContact)=>set({contacts:newContact})
}));

export default useContacts;