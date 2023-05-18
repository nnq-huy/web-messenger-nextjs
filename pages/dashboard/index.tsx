import React from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/protected-route";
import { ContactList } from "@/components/ContactList";

const DashboardPage = () => {
	const {user} = useAuth();

	if (user) {return (
		<ProtectedRoute>
			<div className="flex container bg-gray-100 dark:bg-slate-800 mx-auto shadow-lg min-w-full min-h-screen">
			<ContactList/>
				<div className="text-gray-600 dark:text-gray-100 px-12 py-24 overflow-y-hidden mx-auto">
					<p className="text-center">Hello, you are logged in as: </p>
					<Image 
                        alt="profile picture"
                        height="64"
                        width="64"
                        className="mx-auto w-auto rounded-full"
                        src={user.photoURL??'/images/avatar.webp'}
                    />
					<p className="text-center">{user.displayName ?? ""} <br/>
					{user.email??""}
					</p>
				</div>
			</div>
		</ProtectedRoute>
	)} else {return(
	<ProtectedRoute>
		<div> </div>
	</ProtectedRoute>)}
};

export default DashboardPage;
