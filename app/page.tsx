'use client'
import type { NextPage } from "next";
import { ChatWindow } from "./components/chats/ChatWindow";
import { ContactList } from "./components/ContactList";
import { PlaceHolderPage } from "./components/PlaceHolder";
import { useAuth } from "./context/AuthContext";

const Home: NextPage = () => {
	const {user} = useAuth();

	if (user) {return (
			<div className="flex flex-1 bg-gray-100 dark:bg-gradient-to-b from-slate-800 to-slate-600 mx-auto shadow-lg min-w-full overflow-auto h-[calc(100vh-80px)]">
			<ContactList/>
			<ChatWindow/>
			</div>
	)} else {return(
			<div>
				<PlaceHolderPage/>
			</div>
	)}
};

export default Home;
