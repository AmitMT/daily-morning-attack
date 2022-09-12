/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';

import { LinkIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import Link from 'next/link';

import { CyberAttackType } from '../models/CyberAttack';

export interface HallOfFameProps {
	cyberAttacks: CyberAttackType[];
}

const HallOfFame: FC<HallOfFameProps> = ({ cyberAttacks, ...props }) => {
	return (
		<div className="relative flex-1 flex flex-col min-w-0" {...props}>
			<div className="flex-1 p-2 pb-0 min-w-0 overflow-auto">
				<ol className="flex flex-col gap-2">
					{cyberAttacks &&
						cyberAttacks.map((post) => (
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
			</div>
		</div>
	);
};

export default HallOfFame;
