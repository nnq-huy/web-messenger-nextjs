'use client';
import React from "react";

const SearchButton = () => {
	return (
		<div className="flex justify-center pt-8">
			<button
				type="submit"
				className={`h-12 text-center w-2/3 bg-indigo-600 rounded-md hover:shadow-lg hover:bg-indigo-800 text-lg transition`}
			>
				<p className="capitalize text-gray-100 font-normal">search</p>
			</button>
		</div>
	);
};

export default SearchButton;
