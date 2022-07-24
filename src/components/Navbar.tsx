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
		<div {...props} className="flex p-4 shadow-lg z-40 bg-white dark:bg-neutral-900">
			<p className="font-bold text-lg">התקפת בוקר יומית</p>
			<div className="flex-1 flex flex-row-reverse">
				<div className="flex items-center justify-center  border-2 border-gray-300 dark:border-gray-700 rounded-full overflow-hidden aspect-square -my-2 mr-2 ml-0 cursor-pointer">
					<FontAwesomeIcon icon="user" className="text-2xl text-gray-400" />
				</div>
				<button
					className="flex items-center justify-center border-2 border-gray-300 dark:border-gray-700 rounded-full overflow-hidden aspect-square -my-2 ml-0 cursor-pointer transition-all group hover:bg-neutral-200 dark:hover:bg-neutral-800 ring-neutral-500 ring-0 active:ring-4 active:border-0"
					onClick={() => {
						setTheme(theme === 'light' ? 'dark' : 'light');
					}}
				>
					<FontAwesomeIcon
						icon={theme === 'light' ? 'sun' : 'moon'}
						className="text-2xl text-gray-400 transition-all group-hover:scale-[1.15] group-hover:text-gray-500 dark:group-hover:text-gray-300"
					/>
				</button>
			</div>
		</div>
	);
};

export default Navbar;
