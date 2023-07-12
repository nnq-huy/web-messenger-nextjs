import { LOGIN } from "@/app/utils/constant/routes.constant"
import Link from "next/link"

export const PlaceHolderPage = () => {
	return (
		<div>
			<div className="min-w-full bg-gray-100 dark:bg-slate-800 flex container mx-auto h-[calc(100vh-80px)]">
				<div className="text-gray-600 dark:text-gray-100  px-12 py-24 mt-24 overflow-y-hidden mx-auto">
					<h2 className="text-2xl font-semibold">
						You need to log in to view this page!
					</h2>
					<div className="flex mx-auto pt-12 pb-0">
						<Link href={LOGIN} legacyBehavior>
							<button
								type="button"
								className="bg-indigo-600 hover:bg-indigo-800 hover:shadow-lg transition text-white px-4 py-2 rounded-md mx-auto"
							>
								Login
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}