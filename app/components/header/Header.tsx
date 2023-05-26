'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { HOME, LOGIN, SIGN_UP } from "../../utils/constant/routes.constant";
import { toast } from "react-hot-toast";
import { BsMenuButtonWide } from "react-icons/bs";
import { useState } from "react";

const Header = ({ children }: { children: React.ReactNode }) => {
	const { user, logOut } = useAuth();
	const router = useRouter();
    const [showMobileMenu, setShowMobileMenu]=useState(false);
	const menuItems = [
		{
			id: 1,
			name: "Home",
			link: HOME,
		},
		{
			id: 2,
			name: "Login",
			link: LOGIN,
		},
		{
			id: 3,
			name: "Sign Up",
			link: SIGN_UP,
		},
	];

	const handleLogout = async () => {
		const toastId = toast.loading("Logging out...");
		try {
			await logOut();
            router.push(LOGIN);
			toast.success("You are now logged out", { id: toastId });
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	};
	return <>
        <header className="h-20 flex flex-row mx-auto items-center px-2 py-1 justify-between bg-gray-100 dark:bg-slate-800 shadow-md sticky top-0">
            <div className="flex items-center cursor-pointer transition duration-150 ">
                <Link href={HOME} legacyBehavior>
                    <Image 
                        alt="Logo"
                        height="64"
                        width="64"
                        className="mx-auto w-auto"
                        src="/images/logo.png"
                    />
                </Link>{" "}
            </div>

            <nav className=" flex items-center sm:w-auto md:w-auto overflow-hidden">
                <div className="md:hidden lg:hidden sm:inline-block">
			        <button 
                        onClick={()=>setShowMobileMenu(!showMobileMenu)}
                        className="flex items-center text-indigo-600 p-3"
                    >
			        	<BsMenuButtonWide/>
			        </button>
		        </div>
                {showMobileMenu?<div className="absolute top-20 right-36 md:hidden lg:hidden">
                    <dialog className="bg-gray-100 dark:bg-slate-800 w-36" open>
                        <ul className="block">
                        {!user ? (
                            menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="my-3 hover:bg-gray-300 md:my-0 items-center mr-4 block "
                                >
                                    <Link
                                        href={item?.link}
                                        className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition">
                                        {item?.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <>
                                <li className="my-3 md:my-0 items-center mr-4 block">
                                    <a
                                        onClick={handleLogout}
                                        className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition cursor-pointer"
                                    >
                                        Logout
                                    </a>
                                </li>
                                <p className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition cursor-pointer">Profile</p>
                                </>
                                )}
                        </ul>
                        <form method="dialog">
                            <button className="text-gray-700 dark:text-gray-200">X</button>
                        </form>
                    </dialog>
                </div>:<></>}
                <ul className="text-lg md:inline-block sm:hidden hidden">
                    <>
                        {!user ? (
                            menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="my-3 md:my-0 items-center mr-4 md:inline-block block "
                                >
                                    <Link
                                        href={item?.link}
                                        className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition">
                                        {item?.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <>
                                <li className="my-3 md:my-0 items-center mr-4 md:inline-block block">
                                    <a
                                        onClick={handleLogout}
                                        className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition cursor-pointer"
                                    >
                                        Logout
                                    </a>
                                </li>
                                <Image
                                    alt="profile picture"
                                    height="48"
                                    width="48"
                                    className="rounded-full md:inline-block"
                                    src={user.photoURL??'/images/avatar.jpg'}
                                />
                            </>
                        )}
                    </>
                </ul>
            </nav>
        </header>
        {children}
    </>;
};

export default Header;
