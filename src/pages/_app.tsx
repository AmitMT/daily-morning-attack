import React from 'react';

import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';

import Navbar from '../components/Navbar';

import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const AnyComponent = Component as any;
	return (
		<div className="flex flex-col w-screen h-screen">
			<ThemeProvider attribute="class">
				<Navbar />

				<main dir="ltr" className="flex-1 flex flex-col overflow-auto">
					<div dir="rtl" className="flex-1 relative flex flex-col">
						<AnyComponent {...pageProps} />
					</div>
				</main>
			</ThemeProvider>
		</div>
	);
};

export default MyApp;
