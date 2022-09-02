import React, { useCallback, useState } from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Editor from '../../../components/Editor';
import Preview from '../../../components/Preview';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { setServerSideProtectedView } from '../../../lib/auth/serverSideSession';

export interface EditProps {}

const Edit: NextPage<EditProps> = () => {
	const { data: session } = useSession();

	const [title, setTitle] = useLocalStorage('edited cyber attack title', '');
	const [value, setValue] = useLocalStorage('edited cyber attack', '# Hi!');
	const [sending, setSending] = useState<'idle' | 'pending'>('idle');

	const router = useRouter();

	const handleChange = useCallback(
		(newValue: string) => {
			setValue(newValue);
		},
		[setValue],
	);

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
						className="p-2 bg-gray-100 border-4 dark:border-0 focus:bg-white dark:bg-neutral-700/50 dark:focus:bg-neutral-700 rounded-lg w-full md:w-[50vw] text-center"
					/>
				</h1>
				<p className="font-bold text-2xl">כותב: {session?.user?.name}</p>
			</div>
			<div className="flex-1 flex flex-col p-5 bg-gray-100 dark:bg-neutral-900 w-full">
				<div className="[flex:1_1_auto] flex h-0 overflow-hidden rounded-lg relative edit-view">
					<Editor onChange={handleChange} initialDoc={value} />
					<a
						className="absolute left-[calc(50%_+_40px)] bottom-5 bg-neutral-900 aspect-square w-10 p-1 rounded-full shadow-lg"
						href="/markdown-helper"
						target="_blank"
					>
						<QuestionMarkCircleIcon />
					</a>
					<Preview doc={value} />
				</div>
			</div>
			<button
				type="submit"
				className="w-max my-2 bg-green-400 dark:bg-green-700 px-4 py-2 rounded-lg transition-all hover:scale-110 hover:bg-green-300 dark:hover:bg-green-600 ring-0 active:ring-4 ring-green-400 self-center disabled:opacity-50"
				onClick={() => {
					setSending('pending');
					axios
						.post('/api/cyber-attacks/', { title, markdownContent: value })
						.then((res) => {
							router.push(`/cyber-attacks/${res.data.id}/`);
						})
						.catch(() => {
							setSending('idle');
						});
				}}
				disabled={sending === 'pending'}
			>
				שלח לאיתי ברוק
			</button>
		</div>
	);
};

export const getServerSideProps = setServerSideProtectedView();

export default Edit;
