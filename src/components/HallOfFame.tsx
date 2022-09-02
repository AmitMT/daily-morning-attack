/* eslint-disable no-underscore-dangle */
import React, { FC, useState } from 'react';

import { LinkIcon } from '@heroicons/react/outline';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';

import { CyberAttackType } from '../models/CyberAttack';

export interface HallOfFameProps {
	amount?: number;
}

const HallOfFame: FC<HallOfFameProps> = ({ amount, ...props }) => {
	const [latestPosts, setLatestPosts] = useState<CyberAttackType[] | null>(() => {
		axios
			.get<{ cyberAttacks: CyberAttackType[] }>(
				amount ? `/api/cyber-attacks/?amount=${amount}` : '/api/cyber-attacks/',
			)
			.then(({ data: { cyberAttacks } }) => setLatestPosts(cyberAttacks));

		return null;
	});

	return (
		<div className="relative flex-1 flex flex-col min-w-0" {...props}>
			<div className="flex-1 p-2 pb-0 min-w-0 max-h-80 lg:max-h-max overflow-auto">
				<ol className="flex flex-col gap-2 py-5 -my-5 md:py-0 md:my-0">
					{latestPosts &&
						latestPosts.map((post) => (
							<Link href={`/cyber-attacks/${post._id}/`} key={post._id?.toString()}>
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
	);
};

export default HallOfFame;
