import React, { useEffect, useState } from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomHeader from '../../../components/CustomHeader';
import Preview from '../../../components/Preview';
import { setServerSideSessionView } from '../../../lib/auth/serverSideSession';
import { connect } from '../../../lib/mongodb/connection';
import dbCyberAttack, { CyberAttackType } from '../../../models/CyberAttack';

export interface CyberAttackProps {
	session: Session | null;
	cyberAttack: CyberAttackType | null;
	relatedCyberAttacks: CyberAttackType[];
	latestCyberAttacks: CyberAttackType[];
}

const CyberAttack: NextPage<CyberAttackProps> = ({
	cyberAttack,
	relatedCyberAttacks,
	latestCyberAttacks,
	session,
}) => {
	const [sections, setSections] = useState<HTMLHeadingElement[] | null>();

	const [rightWinState, setRightWinState] = useState<'open' | 'closed'>('closed');
	const [leftWinState, setLeftWinState] = useState<'open' | 'closed'>('closed');

	const router = useRouter();

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
					<p className="font-bold text-xl md:text-2xl">
						{dayjs(cyberAttack?.date).format('DD/MM/YY')}
					</p>
					<div className="flex gap-5">
						{(router.query.admin === 'true' ||
							session?.user?.email === cyberAttack?.author.email) && (
							<Link
								//  eslint-disable-next-line no-underscore-dangle
								href={`/cyber-attacks/${cyberAttack?._id}/edit/${
									router.query.admin === 'true' ? '?admin=true' : ''
								}`}
							>
								<button className="bg-green-500 dark:bg-green-700 p-3 mt-5 -mb-[68px] rounded-xl transition-all hover:scale-110 hover:bg-green-400 dark:hover:bg-green-600">
									ערוך
								</button>
							</Link>
						)}
						{router.query.admin === 'true' && (
							<button
								className="bg-green-500 dark:bg-green-700 p-3 mt-5 -mb-[68px] rounded-xl transition-all hover:scale-110 hover:bg-green-400 dark:hover:bg-green-600"
								onClick={async () => {
									// eslint-disable-next-line no-underscore-dangle
									await axios.post(`/api/cyber-attacks/${cyberAttack?._id}/verify/`).then(() => {
										router.push('/admin/');
									});
								}}
							>
								אשר להפצה
							</button>
						)}
					</div>
				</div>
				<div className="flex justify-center gap-8 pb-5">
					<aside
						className={`fixed 2xl:w-80 rounded-xl top-[50vh] 2xl:top-0 right-0 h-full 2xl:h-auto transition-all pr-2 2xl:pr-0 ${
							rightWinState === 'closed' && ' translate-x-full'
						} 2xl:translate-x-0 duration-500 2xl:relative`}
					>
						{sections && sections.length > 0 && (
							<div className="inline-block 2xl:sticky top-1/2 -translate-y-1/2 2xl:translate-y-0 2xl:top-32 float-left bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none max-w-xs">
								<button
									className="block 2xl:hidden float-left w-7 dark:w-5 h-10 bg-white border-4 border-r-0 dark:bg-neutral-800 dark:border-0 rounded-l-xl absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 font-bold"
									onClick={() => {
										rightWinState === 'open'
											? setRightWinState('closed')
											: setRightWinState('open');
									}}
								>
									{rightWinState === 'open' ? '<' : '>'}
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
							</div>
						)}
					</aside>

					<article className="max-w-4xl dark:bg-neutral-900 rounded-xl overflow-hidden border-4 dark:border-none m-2 lg:m-0 h-max">
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
					</article>

					<aside
						className={`fixed 2xl:w-80 rounded-xl top-[50vh] 2xl:top-0 left-0 h-full 2xl:h-auto transition-all pl-2 2xl:pl-0 ${
							leftWinState === 'closed' && ' -translate-x-full'
						} 2xl:translate-x-0 duration-500 2xl:relative`}
					>
						<div className="inline-block 2xl:sticky top-1/2 -translate-y-1/2 2xl:translate-y-0 2xl:top-32 float-right bg-white dark:bg-neutral-800 rounded-xl py-3 border-4 dark:border-none max-w-xs">
							<button
								className="block 2xl:hidden float-right w-7 dark:w-5 h-10 bg-white border-4 border-l-0 dark:bg-neutral-800 dark:border-0 rounded-r-xl absolute right-0 translate-x-full top-1/2 -translate-y-1/2 font-bold"
								onClick={() => {
									leftWinState === 'open' ? setLeftWinState('closed') : setLeftWinState('open');
								}}
							>
								{leftWinState === 'open' ? '>' : '<'}
							</button>
							<div className="max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700 py-2 px-5 max-w-[calc(100vw-4rem)]">
								{relatedCyberAttacks && relatedCyberAttacks.length > 0 && (
									<div>
										<h3 className="font-bold mb-4">התקפות דומות</h3>
										<ol className="font-semibold">
											{relatedCyberAttacks.map((relatedCyberAttack) => (
												<li
													key={relatedCyberAttack.title}
													className="text-gray-600 dark:text-gray-400 truncate"
												>
													{relatedCyberAttack.title}
												</li>
											))}
										</ol>
									</div>
								)}
								<div>
									<h3 className="font-bold my-4">התקפות חדשות</h3>
									<ol className="font-semibold">
										{latestCyberAttacks.map((latestCyberAttack) => (
											<li
												key={latestCyberAttack.title}
												className="text-gray-600 dark:text-gray-400"
											>
												<span className="cursor-pointer">{latestCyberAttack.title}</span>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = setServerSideSessionView<CyberAttackProps>(async ({ params }) => {
	await connect();

	const cyberAttack = JSON.parse(
		JSON.stringify(await dbCyberAttack.findById(params?.id).populate('author').exec()),
	);

	const [relatedCyberAttacks, latestCyberAttacks] = await Promise.all([
		(async () => {
			const uniqBy = <T extends { [key: string]: any }>(arr: T[], key: keyof T) => {
				const seen: { [key: string]: boolean } = {};
				// eslint-disable-next-line no-return-assign
				return arr.filter((item) => (seen[item[key]] ? false : (seen[item[key]] = true)));
			};

			const removeBy = <T extends { [key: string]: any }>(
				arr: T[],
				indexFinder: (item: T) => boolean,
			) => {
				// console.log(arr);

				const index = arr.findIndex(indexFinder);

				if (index !== -1) arr.splice(index, 1);
				return arr;
			};

			return JSON.parse(
				JSON.stringify(
					removeBy(
						uniqBy(
							(
								await Promise.all(
									(cyberAttack.title as string).split(' ').map(
										async (current) =>
											(await dbCyberAttack.aggregate([
												{
													$search: {
														index: 'default',
														text: {
															query: current,
															path: {
																wildcard: '*',
															},
														},
													},
												},
												{ $match: { verified: true } },
												{
													$project: {
														title: 1,
														score: { $meta: 'searchScore' },
													},
												},
											])) as CyberAttackType[],
									),
								)
							)
								.reduce<CyberAttackType[]>((prev, current) => [...prev, ...current], [])
								.sort((a, b) => (b as any).score - (a as any).score),
							'_id',
						),
						(item) => {
							// eslint-disable-next-line no-underscore-dangle
							return item._id?.toString() === cyberAttack._id.toString();
						},
					),
				),
			);
		})(),
		(async () => {
			return JSON.parse(
				JSON.stringify(
					await dbCyberAttack
						.find({ verified: true })
						.sort({ date: -1 })
						.populate('author')
						.limit(30)
						.select('-markdownContent')
						.exec(),
				),
			);
		})(),
	]);

	return {
		props: {
			cyberAttack,
			relatedCyberAttacks,
			latestCyberAttacks,
		},
	};
});

export default CyberAttack;
