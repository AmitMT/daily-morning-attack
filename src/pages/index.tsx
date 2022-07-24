import React, { useEffect } from 'react';

import { NextPage } from 'next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactLinkify from 'react-linkify';

import CustomHeader from '../components/CustomHeader';
import hatkafaExs from '../utils/hatkafa-exs';

const Index: NextPage = () => {
	const router = useRouter();

	const linksBuilder = (href: string, text: string, key: number) => (
		<a href={href} key={key} target="_blank" rel="noreferrer">
			{text}
		</a>
	);

	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		if (theme === 'system')
			setTheme(
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light',
			);
	}, [theme, setTheme]);

	return (
		<>
			<CustomHeader />

			<main dir="ltr" className="flex-1 flex flex-col overflow-auto">
				<div dir="rtl" className="flex-1 relative flex flex-col">
					<div className="relative z-10 bg-black shadow-gray-500 dark:shadow-none shadow-xl">
						<div className="pointer-events-none select-none">
							<Image
								src={`${router.basePath}/main_background.jpg`}
								className="fixed -z-50 opacity-80 blur-sm brightness-200 dark:opacity-90 dark:brightness-90 saturate-[.75] dark:saturate-[.5] w-full h-full transition-all"
								layout="fill"
								objectFit="cover"
								alt="main background"
							/>
						</div>
						<section className="flex flex-col justify-center items-center h-[65vh]">
							<h1 className="font-bold text-5xl mb-10 text-white">ברוכים הבאים</h1>
							<p className="w-1/2 font-semibold text-lg text-white dark:text-gray-200">
								תקיפת הבוקר היומית היא יוזמה חברתית והתנדבותית בתחומים של אבטחת מידע ובמיוחד של
								סייבר התקפי. מידי בוקר שולחים מאמר קצר שכתבו על תקיפה, חולשה, הגנה או משהו אחר
								שמעניין אותם עם היבט התקפי והסבירו בצורה פשוטה וקריאה להבנה.
							</p>
						</section>
					</div>

					<section className="flex px-20 py-10 bg-gray-100 dark:bg-neutral-900 gap-4 break-words">
						<article className="flex-1 min-w-0 p-2">
							<h2 className="font-bold text-xl text-slate-500 dark:text-slate-400">
								התקפת הבוקר היומית
							</h2>
							<h1 className="font-bold text-3xl mb-2">Windows Utilman Attack</h1>
							<h3 className="font-semibold mb-5">כתב: רן דוד </h3>
							<p className="whitespace-pre-wrap dark:text-gray-300">
								<ReactLinkify componentDecorator={linksBuilder}>{hatkafaExs}</ReactLinkify>
							</p>
						</article>
						<div className="w-[6px] bg-gray-300 rounded-full" />
						<div className="flex-1 p-2 min-w-0">
							<h2 className="font-bold text-xl text-slate-500 dark:text-slate-400 mb-5">
								היכל התהילה
							</h2>
							<ol className="flex flex-col gap-2">
								{[...Array(30)].map((_n, i) => (
									<li
										// eslint-disable-next-line react/no-array-index-key
										key={i}
										className="flex-1 flex items-center p-2 font-bold bg-gray-50 dark:bg-neutral-800 border-2 dark:border-none rounded-md cursor-pointer whitespace-nowrap text-gray-700 dark:text-gray-200"
									>
										<p className="border-l-2 dark:border-neutral-700 pl-2 ml-2">{i + 20}/7/22</p>
										<p className="bg-indigo-100 dark:bg-indigo-900 rounded-md px-2 py-1">
											איתי ברוק
										</p>
										<p className="border-r-2 dark:border-neutral-700 pr-2 mr-2 truncate">
											כותרת של התקפת בוקר ששששששששששששששש כותרת ארוכה במיוחד
											ששששששששששששששששששששששששששששששששששששש
										</p>
									</li>
								))}
							</ol>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default Index;
