import React, { FC } from 'react';

import { MoonIcon, SunIcon, UserIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';

export interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
	const { data: session } = useSession();
	const { theme, setTheme } = useTheme();

	return (
		<nav {...props} className="flex p-5 shadow-lg z-40 bg-slate-200 dark:bg-neutral-800">
			<Link href="/">
				<p className="font-bold cursor-pointer text-2xl my-1">{AppConfig.title}</p>
			</Link>
			<div className="flex-1 flex flex-row-reverse">
				<button className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-4 border-gray-400 dark:border-0 rounded-full overflow-hidden aspect-square -my-2 mr-2 ml-0 transition-all duration-300 hover:scale-110 active:scale-100 cursor-pointer relative">
					{session?.user?.image ? (
						<Image src={session?.user?.image} layout="fill" objectFit="contain" alt="user image" />
					) : (
						<UserIcon className="w-6" />
					)}
				</button>

				<button
					className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-4 border-gray-400 dark:border-0 rounded-full overflow-hidden aspect-square -my-2 ml-0 cursor-pointer transition-all duration-300 group hover:scale-110 active:scale-100 dark:hover:bg-neutral-700"
					onClick={() => {
						setTheme(theme === 'light' ? 'dark' : 'light');
					}}
				>
					{theme === 'dark' ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
