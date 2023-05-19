'use client'

import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import ProtectedRoute from "@/app/components/protected-route/page";
import { ContactList } from "@/app/components/ContactList";
import { ChatWindow } from "@/app/components/ChatWindow";
import { PlaceHolderPage } from "@/app/components/PlaceHolder";

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
			<div>
				<PlaceHolderPage/>
			</div>
	)}
};

export default DashboardPage;
