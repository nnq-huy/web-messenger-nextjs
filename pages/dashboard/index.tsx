import React from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/protected-route";
import { ContactList } from "@/components/ContactList";
import { ChatWindow } from "@/components/ChatWindow";

const DashboardPage = () => {
	const {user} = useAuth();

	if (user) {return (
		<ProtectedRoute>
			<div className="flex flex-1 bg-gray-100 dark:bg-slate-800 mx-auto shadow-lg min-w-full overflow-auto h-[calc(100vh-80px)]">
			<ContactList/>
			<ChatWindow/>
			</div>
		</ProtectedRoute>
	)} else {return(
		<div> </div>
	)}
};

export default DashboardPage;
