'use client'

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { LOGIN } from "@/app/utils/constant/routes.constant";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			router.push(LOGIN);
		}
	}, [router, user]);
	return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;
