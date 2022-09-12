/* eslint-disable react/jsx-key */
import React, { FC } from 'react';

import {
	ArrowCircleLeftIcon,
	FireIcon,
	LockClosedIcon,
	MoonIcon,
	PencilAltIcon,
	PlusIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { AppConfig } from '../utils/AppConfig';
import Dropdown, { OptionGroup } from './Dropdown';

export interface NavbarProps {}

const loggedInDropdown: OptionGroup[] = [
	[
		{
			content: (
				<button className="flex w-full p-2" onClick={() => Router.router?.push('/profile')}>
					<UserIcon className="w-5 ml-2" />
					פרופיל
				</button>
			),
		},
		{
			content: (
				<button
					className="flex w-full p-2"
					onClick={() => Router.router?.push('/cyber-attacks/create')}
				>
					<PlusIcon className="w-5 ml-2" />
					צור מתקפה חדשה
				</button>
			),
		},
	],
	{
		content: (
			<button onClick={() => Router.router?.push('/hall-of-fame')} className="flex w-full p-2">
				<FireIcon className="w-5 ml-2" />
				היכל התהילה
			</button>
		),
	},
	{
		content: (
			<button onClick={() => signOut()} className="flex w-full p-2">
				<ArrowCircleLeftIcon className="w-5 ml-2" />
				התנתק
			</button>
		),
	},
];

const noSessionDropdown: OptionGroup[] = [
	[
		{
			content: (
				<button onClick={() => signIn()} className="flex w-full p-2">
					<LockClosedIcon className="w-5 ml-2" />
					התחבר
				</button>
			),
		},
		{
			content: (
				<button
					onClick={() =>
						Router.router?.push(`/auth/login/?callbackUrl=${window.location.href}&method=register`)
					}
					className="flex w-full p-2"
				>
					<PencilAltIcon className="w-5 ml-2" />
					הירשם
				</button>
			),
		},
	],
	{
		content: (
			<button onClick={() => Router.router?.push('/hall-of-fame')} className="flex w-full p-2">
				<FireIcon className="w-5 ml-2" />
				היכל התהילה
			</button>
		),
	},
];

const Navbar: FC<NavbarProps> = ({ ...props }) => {
	const router = useRouter();
	const { data: session } = useSession();
	const { theme, setTheme } = useTheme();

	return (
		<nav
			{...props}
			className="flex justify-center shadow-xl dark:shadow-black/20 z-40 bg-indigo-200 dark:bg-neutral-800 h-16"
		>
			<div className="flex flex-1 px-2 lg:px-20">
				<Link href="/">
					<button className="font-bold cursor-pointer text-lg my-[0.4rem] md:text-2xl md:my-1 flex items-center">
						<div className="ml-4 flex items-center relative pt-3">
							<Image
								src={`${router.basePath}/logoSVG.svg`}
								width={52 * 1.480209}
								height={52}
								alt="logo"
							/>
						</div>
						<div className="w-24 sm:w-auto">{AppConfig.title}</div>
					</button>
				</Link>
				<div className="flex-1 flex flex-row-reverse p-2 pl-0">
					<Dropdown
						groups={session ? loggedInDropdown : noSessionDropdown}
						className={`flex mr-2 aspect-square transition-all ${
							router.pathname === '/auth/login' ? 'w-0 mr-0 overflow-hidden' : ''
						}`}
						direction="right"
					>
						<button
							className={`flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-gray-400 rounded-full overflow-hidden aspect-square transition-all duration-300 cursor-pointer relative${
								session?.user
									? ' hover:scale-110 active:scale-100 dark:hover:bg-neutral-500'
									: ' glowing'
							}`}
						>
							{session?.user ? (
								session.user.image ? (
									<div className="w-[calc(100%-8px)] h-[calc(100%-8px)] relative rounded-full overflow-hidden">
										<Image
											src={session?.user?.image}
											layout="fill"
											objectFit="contain"
											alt="user image"
										/>
									</div>
								) : (
									<UserIcon className="w-6" />
								)
							) : (
								<div className="font-bold text-sm transition-all">login</div>
							)}
						</button>
					</Dropdown>

					<button
						className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-gray-400 rounded-full overflow-hidden aspect-square cursor-pointer transition-all duration-300 group hover:scale-110 active:scale-100 dark:hover:bg-neutral-500"
						onClick={() => {
							setTheme(theme === 'light' ? 'dark' : 'light');
						}}
					>
						{theme === 'dark' ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
