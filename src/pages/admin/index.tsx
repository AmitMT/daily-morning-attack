/* eslint-disable no-underscore-dangle */
import React from 'react';

import { LinkIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomHeader from '../../components/CustomHeader';
import { setServerSideSessionView } from '../../lib/auth/serverSideSession';
import { connect } from '../../lib/mongodb/connection';
import CyberAttack, { CyberAttackType } from '../../models/CyberAttack';

const amountOfPosts = 30;

type AdminProps = {
	session: Session | null;
	cyberAttacks: CyberAttackType[];
};

const Admin: NextPage<AdminProps> = ({ cyberAttacks, session }) => {
	const router = useRouter();

	return (
		<>
			<CustomHeader />

			<div className="relative z-10 bg-slate-900 shadow-gray-500 dark:shadow-none shadow-xl">
				<div className="absolute inset-0 pointer-events-none select-none">
					<Image
						src={`${router.basePath}/main_background.jpg`}
						className="-z-50 opacity-60 blur-sm brightness-150 dark:opacity-90 dark:brightness-90 saturate-[.75] dark:saturate-[.5] w-full h-full transition-all"
						layout="fill"
						objectFit="cover"
						alt="main background"
						priority
					/>
				</div>
				<section className="flex flex-col justify-center items-center h-[65vh] min-h-[400px]">
					<h1 className="font-bold text-4xl lg:text-6xl mb-10 text-white text-center">
						שלום {session?.user?.name}
					</h1>
					<p className="text-center mx-4 md:mx-0 md:w-1/2 font-semibold text-xl lg:text-3xl text-white dark:text-gray-200">
						הגעת לעמוד המנהלים
						<br />
						פה תוכל לערוך ולאשר התקפות בוקר
						<br />
						<br />
						אם אתה מבצרניק שפרץ לפה shame on you
					</p>
				</section>
			</div>

			<section className="flex pt-10 lg:p-10 bg-gray-100 dark:bg-neutral-900 break-words justify-center">
				{cyberAttacks && cyberAttacks.length > 0 && (
					<article className="w-1/2 flex flex-col min-w-0">
						<h2 className="font-bold text-2xl text-slate-500 dark:text-slate-300 mb-5 text-center">
							היכל התהילה
						</h2>
						<div className="relative flex-1 flex flex-col min-w-0">
							<div className="flex-1 px-2 py-5 pb-0 min-w-0 max-h-80 lg:max-h-max overflow-auto">
								<ol className="flex flex-col gap-2 py-5 -my-5 md:py-0 md:my-0">
									{cyberAttacks &&
										cyberAttacks.map((post) => (
											<Link
												href={`/cyber-attacks/${post._id}/?admin=true`}
												key={post._id?.toString()}
											>
												<div className="flex items-center p-2 px-4 font-bold bg-gray-50 dark:bg-neutral-800 border-2 dark:border-none rounded-md cursor-pointer whitespace-nowrap text-gray-700 dark:text-gray-200 group transition-all hover:bg-white dark:hover:bg-neutral-700">
													<p className="border-l-2 dark:border-neutral-700 pl-2 ml-2">
														{dayjs(post.date).format('DD/MM/YY')}
													</p>
													<p className="bg-indigo-100 dark:bg-indigo-900 rounded-md px-2 py-1">
														{post.author.name}
													</p>
													<p className="border-r-2 dark:border-neutral-700 pr-2 mr-2 truncate">
														{post.title}
													</p>
													<div className="mr-auto pr-2 h-4">
														<LinkIcon className="h-0 transition-all group-hover:h-4" />
													</div>
												</div>
											</Link>
										))}
								</ol>
								<div className="block md:hidden absolute top-0 h-5 w-full bg-gradient-to-t from-transparent to-gray-100 dark:to-neutral-900 pointer-events-none" />
								<div className="block md:hidden absolute bottom-0 h-5 w-full bg-gradient-to-b from-transparent to-gray-100 dark:to-neutral-900 pointer-events-none" />
							</div>
						</div>
					</article>
				)}
			</section>
		</>
	);
};

export const getServerSideProps = setServerSideSessionView<AdminProps>(async () => {
	await connect();

	const cyberAttacks = (await JSON.parse(
		JSON.stringify(
			await CyberAttack.find({ verified: { $ne: true } })
				.sort({ date: -1 })
				.populate('author')
				.limit(amountOfPosts)
				.select('-markdownContent')
				.exec(),
		),
	)) as CyberAttackType[];

	return {
		props: {
			cyberAttacks,
		},
	};
});

export default Admin;
