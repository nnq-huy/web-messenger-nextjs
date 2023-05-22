import { create } from 'zustand'
import { Contact } from '../models/contact';

interface ContactsStore {
  contacts: Contact[];
  setContacts: (newContact: Contact[]) => void;
}

const useContacts = create<ContactsStore>((set) => ({
    contacts:[],
    setContacts: (newContact)=>set({contacts:newContact})
}));

export default useContacts;