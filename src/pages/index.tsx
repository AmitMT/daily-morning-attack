import React from 'react';

import { NextPage } from 'next';

import CustomHeader from '../components/CustomHeader';

const Index: NextPage = () => {
	return (
		<>
			<CustomHeader />

			<main className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
				<button className="bg-indigo-500 shadow-2xl shadow-indigo-500/50 px-12 py-8 rounded-2xl text-white text-7xl font-bold transition-all duration-200 hover:bg-indigo-500 hover:scale-105 active:scale-100 active:shadow-none hover:border-8 hover:border-white hover:shadow-gray-500/50">
					Hello!
				</button>
			</main>
		</>
	);
};

export default Index;
