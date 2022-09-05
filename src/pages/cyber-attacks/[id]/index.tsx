import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { Session } from 'next-auth';

import CustomHeader from '../../../components/CustomHeader';
import { setServerSideSessionView } from '../../../lib/auth/serverSideSession';
import { connect } from '../../../lib/mongodb/connection';
import { CyberAttackType } from '../../../models/CyberAttack';

export interface CyberAttackProps {
	session: Session | null;
	cyberAttack: CyberAttackType | null | string;
}

const CyberAttack: NextPage<CyberAttackProps> = ({ cyberAttack }) => {
	console.log(cyberAttack);

	const [sections, setSections] = useState<HTMLHeadingElement[] | null>();

	const [rightWinState, setRightWinState] = useState<'open' | 'closed'>('closed');
	const [leftWinState, setLeftWinState] = useState<'open' | 'closed'>('closed');

	useEffect(() => {
		const parent = document.getElementById('markdown-preview');
		if (parent) setSections(Array.from(parent.querySelectorAll('h1')));
	}, []);

	return (
		<>
			<CustomHeader />

			<div className="relative overflow-x-hidden 2xl:overflow-x-visible">
				<div
					className={`absolute inset-0 bg-black transition-opacity duration-500 ${
						rightWinState === 'open' || leftWinState === 'open'
							? 'opacity-50'
							: 'opacity-0 pointer-events-none'
					}`}
					onClick={() => {
						if (rightWinState === 'open') setRightWinState('closed');
						if (leftWinState === 'open') setLeftWinState('closed');
					}}
				/>
				<div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-transparent px-5 py-10 mb-5 md:mb-10 md:py-28">
					<h1 className="font-bold text-4xl mb-2 md:mb-5 text-center md:text-6xl">
						תקיפת בוקר יומית
					</h1>
					<p className="font-bold text-xl md:text-2xl">25/7/22</p>
				</div>
				<div className="flex justify-center gap-8">
					<aside
						className={`fixed 2xl:w-80 rounded-xl top-[50vh] 2xl:top-0 right-0 h-full 2xl:h-auto transition-all pr-2 2xl:pr-0 ${
							rightWinState === 'closed' && ' translate-x-full'
						} 2xl:translate-x-0 duration-500 2xl:relative`}
					>
						<div className="inline-block 2xl:sticky top-1/2 -translate-y-1/2 2xl:translate-y-0 2xl:top-32 float-left bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none max-w-xs">
							{sections && sections.length > 0 && (
								<>
									<button
										className="block 2xl:hidden float-left w-5 h-10 bg-black rounded-l-xl absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 font-bold"
										onClick={() => {
											rightWinState === 'open'
												? setRightWinState('closed')
												: setRightWinState('open');
										}}
									>
										&#62;
									</button>
									<div className="max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 py-2 px-5">
										<h3 className="font-bold mb-4">בעמוד זה</h3>
										<ol className="font-semibold">
											{sections.map((h1) => (
												<li key={h1.innerText} className="truncate">
													<a
														className="text-gray-600 dark:text-gray-400"
														onClick={() => {
															h1.scrollIntoView();
														}}
													>
														- {h1.innerText}
													</a>
												</li>
											))}
										</ol>
									</div>
								</>
							)}
						</div>
					</aside>

					{/* <article className="max-w-4xl dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md dark:shadow-none border-4 dark:border-none m-2 lg:m-0">
						<div className="p-10 bg-gray-100 border-b-4 dark:border-b-0 dark:bg-neutral-800">
							<h1 className="font-bold text-3xl mb-2 truncate">{cyberAttack?.title}</h1>
							<h3 className="font-semibold mb-5 truncate">
								כתב: <a className="font-bold">{cyberAttack?.author.name}</a>
							</h3>
							<p className="font-semibold">
								עודכן לאחרונה:{' '}
								<span className="font-bold">
									{dayjs(cyberAttack?.date).format('DD/MM/YY')} ב-
									{dayjs(cyberAttack?.date).format('HH:mm')}
								</span>
							</p>
						</div>
						{cyberAttack && <Preview doc={cyberAttack?.markdownContent} />}
					</article> */}

					<aside
						className={`fixed 2xl:w-80 rounded-xl top-[50vh] 2xl:top-0 left-0 h-full 2xl:h-auto transition-all pl-2 2xl:pl-0 ${
							leftWinState === 'closed' && ' -translate-x-full'
						} 2xl:translate-x-0 duration-500 2xl:relative`}
					>
						<div className="inline-block 2xl:sticky top-1/2 -translate-y-1/2 2xl:translate-y-0 2xl:top-32 float-right bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none max-w-xs">
							{sections && sections.length > 0 && (
								<>
									<button
										className="block 2xl:hidden float-right w-5 h-10 bg-black rounded-r-xl absolute right-0 translate-x-full top-1/2 -translate-y-1/2 font-bold"
										onClick={() => {
											leftWinState === 'open' ? setLeftWinState('closed') : setLeftWinState('open');
										}}
									>
										&#60;
									</button>
									<div className="max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 py-2 px-5">
										<div>
											<h3 className="font-bold mb-4">התקפות דומות</h3>
											<ol className="font-semibold">
												<li className="text-gray-600 dark:text-gray-400 truncate">
													<span className="cursor-pointer">
														Hatkafa
														Domasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
													</span>
												</li>
												<li className="text-gray-600 dark:text-gray-400">
													<span className="cursor-pointer">WSL debugging</span>
												</li>
												<li className="text-gray-600 dark:text-gray-400">
													<span className="cursor-pointer">Windows unresponsive bug</span>
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
								</>
							)}
						</div>
					</aside>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = setServerSideSessionView<CyberAttackProps>(async () => {
	await connect();

	// const cyberAttack =
	// 	// JSON.parse(
	// 	JSON.stringify(await dbCyberAttack.findById(params?.id).populate('author').exec(), null, 2);
	// // ) as CyberAttackType;

	return {
		props: {
			cyberAttack: 'hi',
		},
	};
});

export default CyberAttack;
