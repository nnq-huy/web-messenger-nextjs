'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import useCurrentContact from "../hooks/useCurrentContact";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const {contact, setCurentContact} = useCurrentContact();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					displayName: user.displayName,
					email: user.email,
					uid: user.uid,
					photoURL: user.photoURL
				});
			} else {
				setUser(null);
			}
		});
		setLoading(false);

		return () => unsubscribe();
	}, []);

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const provider = new GoogleAuthProvider();
	provider.addScope('profile');
	provider.addScope('email');
	const logInWithGoogle = () =>  signInWithPopup(auth, provider);

	const logIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = async () => {
		setUser(null);
		setCurentContact({uid:'',displayName:'',email:'',threadId:''});
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, signUp, logIn,logInWithGoogle, logOut }}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
