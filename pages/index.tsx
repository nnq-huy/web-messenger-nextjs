import type { NextPage } from "next";
import Link from "next/link";
import { DASHBOARD } from "../utils/constant/routes.constant";

const Home: NextPage = () => {
	return (
        <div className="min-w-full min-h-screen bg-gray-100 dark:bg-slate-800 flex container mx-auto">
			<div className="text-gray-600 dark:text-gray-100  px-12 py-24 mt-24 overflow-y-hidden mx-auto">
				<h2 className="text-2xl font-semibold">
					Get started with nextMessage
				</h2>
				<div className="flex mx-auto pt-12 pb-0">
					<Link href={DASHBOARD} legacyBehavior>
						<button
							type="button"
							className="bg-indigo-600 hover:bg-indigo-800 hover:shadow-lg transition text-white px-4 py-2 rounded-md mx-auto"
						>
							Go to dashboard
						</button>
					</Link>
				</div>
			</div>
			
		</div>
    );
};

export default Home;
