import React, { useEffect, useState } from 'react';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import Navbar from '../components/Navbar';

import '../styles/main.css';
import '../styles/github-markdown-theme.css';

const MainComponent = ({ Component, pageProps }: AppProps) => {
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		if (theme === 'system' || typeof theme === 'undefined') {
			setTheme(
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light',
			);
		}
	}, [theme, setTheme]);

	return (
		<main dir="ltr" className="flex-1 flex flex-col overflow-auto" id="main">
			<div dir="rtl" className="flex-1 relative flex flex-col">
				<Component {...pageProps} />
			</div>
		</main>
	);
};

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="flex flex-col w-screen h-screen">
			{loaded && (
				<SessionProvider session={pageProps.session}>
					<ThemeProvider attribute="class">
						<Navbar />

						<MainComponent {...{ Component, pageProps, ...appProps }} />

						<NextNProgress
							color="#29D"
							startPosition={0.333}
							stopDelayMs={200}
							height={3}
							options={{ showSpinner: false }}
						/>
					</ThemeProvider>
				</SessionProvider>
			)}
		</div>
	);
};

export default MyApp;
