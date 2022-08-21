import React, { useCallback } from 'react';

import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Editor from '../../../components/Editor';
import Preview from '../../../components/Preview';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { setProtectedView } from '../../../lib/auth/serverSideSession';

export interface EditProps {}

const Edit: NextPage<EditProps> = () => {
	const { data: session } = useSession();

	const [title, setTitle] = useLocalStorage('edited cyber attack title', '');
	const [value, setValue] = useLocalStorage('edited cyber attack', '# Hi!');

	const handleChange = useCallback((newValue: string) => {
		setValue(newValue);
	}, []);

	return (
		<div className="flex-1 flex flex-col">
			<div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-transparent p-14">
				<h1 className="flex font-bold text-6xl mb-5">
					<input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						placeholder="כותרת"
						dir="auto"
						className="p-2 bg-gray-100 border-4 dark:border-0 focus:bg-white dark:bg-neutral-700/50 dark:focus:bg-neutral-700 rounded-lg w-[50vw] text-center"
					/>
				</h1>
				<p className="font-bold text-2xl">כותב: {session?.user?.name}</p>
			</div>
			<div className="flex-1 flex flex-col p-5 bg-gray-100 dark:bg-neutral-900">
				<div className="[flex:1_1_auto] flex h-0 overflow-hidden rounded-lg">
					<Editor onChange={handleChange} initialDoc={value} />
					<Preview doc={value} />
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = setProtectedView();

export default Edit;
