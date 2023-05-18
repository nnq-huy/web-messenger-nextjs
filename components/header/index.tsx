import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD, HOME, LOGIN, SIGN_UP } from "../../utils/constant/routes.constant";
import { toast } from "react-hot-toast";

const Header = ({ children }: { children: React.ReactNode }) => {
	const { user, logOut } = useAuth();
	const router = useRouter();
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
			toast.success("You are now logged out", { id: toastId });
			router.push(LOGIN);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	};
	return <>
        <header className="flex flex-wrap container mx-auto max-w-full items-center px-2 py-1 justify-between bg-gray-100 dark:bg-gray-900 shadow-md sticky top-0 z-50">
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

            <nav className={`md:flex md:items-center font-title w-full md:w-auto`}>
                <ul className="text-lg inline-block">
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
                                <li className="my-3 md:my-0 items-center mr-4 md:inline-block block ">
                                    <Link href={DASHBOARD} className="text-blue-800 hover:text-blue-900 dark:text-slate-400 dark:hover:text-slate-700 transition">
                                            Dashboard
                                    </Link>
                                </li>
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
                                    src={user.photoURL??'/images/avatar.webp'}
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
