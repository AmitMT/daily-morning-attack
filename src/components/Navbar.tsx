import React, { FC } from 'react';

import fontawesome from '@fortawesome/fontawesome';
import { faMoon, faSun, faUser } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';

fontawesome.library.add(faUser, faSun, faMoon);

export interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div {...props} className="flex p-5 shadow-lg z-40 bg-blue-100 dark:bg-neutral-800">
			<p className="font-bold text-lg cursor-pointer">התקפת בוקר יומית</p>
			<div className="flex-1 flex flex-row-reverse">
				<div className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-4 border-gray-400 dark:border-neutral-500 rounded-full overflow-hidden aspect-square -my-2 mr-2 ml-0 transition-all duration-300 hover:scale-110 cursor-pointer">
					<FontAwesomeIcon
						icon="user"
						className="text-4xl text-gray-600 dark:text-neutral-300 mt-2"
					/>
				</div>
				<button
					className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 border-4 border-gray-400 dark:border-neutral-500 rounded-full overflow-hidden aspect-square -my-2 ml-0 cursor-pointer transition-all duration-300 group hover:scale-110 dark:hover:bg-neutral-700"
					onClick={() => {
						setTheme(theme === 'light' ? 'dark' : 'light');
					}}
				>
					<FontAwesomeIcon
						icon={theme === 'light' ? 'sun' : 'moon'}
						className="text-2xl text-gray-600 dark:text-neutral-300 transition-all duration-300 group-active:scale-75"
					/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
