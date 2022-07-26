import React from 'react';

import { NextPage } from 'next';
import ReactLinkify from 'react-linkify';

import hatkafaExs from '../../utils/hatkafa-exs';

export interface CyberAttackProps {}

const CyberAttack: NextPage<CyberAttackProps> = () => {
	const linksBuilder = (href: string, text: string, key: number) => (
		<a href={href} key={key} target="_blank" rel="noreferrer" dir="auto">
			{text}
		</a>
	);

	return (
		<>
			<div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-transparent p-14 mb-5">
				<h1 className="font-bold text-6xl mb-5">תקיפת בוקר יומית</h1>
				<p className="font-bold text-2xl mb-10">25/7/22</p>
			</div>
			<div className="flex justify-center gap-8">
				<aside className="w-80 rounded-xl relative">
					<div className="inline-block sticky top-32 float-left max-h-[calc(100vh-16rem)] bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none">
						<div className="max-h-[calc(100vh-17.5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 py-2 px-5">
							<h3 className="font-bold mb-4">בעמוד זה</h3>
							<ol className="font-semibold">
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- הקדמה</span>
								</li>
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- הרעיון מאחורי התקיפה</span>
								</li>
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- הגנה</span>
								</li>
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- סיכום</span>
								</li>
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- מקורות והרחבות</span>
								</li>
								<li className="text-gray-600 dark:text-gray-400">
									<span className="cursor-pointer">- הקדמה</span>
								</li>
							</ol>
						</div>
					</div>
				</aside>

				<article className="max-w-4xl dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md dark:shadow-none border-4 dark:border-none">
					<div className="p-10 bg-gray-100 border-b-4 dark:border-b-0 dark:bg-neutral-800">
						<h1 className="font-bold text-3xl mb-2">Windows Utilman Attack</h1>
						<h3 className="font-semibold mb-5">
							כתב: <a className="font-bold">רן דוד</a>
						</h3>
						<p className="font-semibold">
							עודכן לאחרונה: <span className="font-bold">25/7/22 ב-20:59</span>
						</p>
					</div>
					<p className="whitespace-pre-wrap dark:text-gray-300 p-5">
						<ReactLinkify componentDecorator={linksBuilder}>{hatkafaExs}</ReactLinkify>
					</p>
				</article>

				<aside className="w-80 rounded-xl relative">
					<div className="inline-block sticky top-32 max-h-[calc(100vh-16rem)] bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none">
						<div className="max-h-[calc(100vh-17.5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 py-2 px-5">
							<div className="border-b-2 dark:border-b-neutral-700 pb-5 mb-5">
								<h3 className="font-bold mb-4">התקפות דומות</h3>
								<ol className="font-semibold">
									<li className="text-gray-600 dark:text-gray-400">
										<span className="cursor-pointer">Hatkafa Doma</span>
									</li>
									<li className="text-gray-600 dark:text-gray-400">
										<span className="cursor-pointer">WSL debugging</span>
									</li>
									<li className="text-gray-600 dark:text-gray-400">
										<span className="cursor-pointer">Windows unresponsive bug</span>
									</li>
								</ol>
							</div>

							<div>
								<h3 className="font-bold mb-4">התקפות חדשות</h3>
								<ol className="font-semibold">
									{[...Array(30)].map((_n, i) => (
										// eslint-disable-next-line react/no-array-index-key
										<li key={i} className="text-gray-600 dark:text-gray-400">
											<span className="cursor-pointer">כותרת התקפת בוקר</span>
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
};

export default CyberAttack;
