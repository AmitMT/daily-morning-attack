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
				<AnyComponent {...pageProps} />
			</ThemeProvider>
		</div>
	);
};

export default MyApp;
