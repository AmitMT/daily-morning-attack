import React, { useState } from 'react';

import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { setProtectedView } from '../../../lib/auth/serverSideSession';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor'), { ssr: false });

export interface EditProps {}

const Edit: NextPage<EditProps> = ({ ...props }) => {
	const [value, setValue] = useState<string | undefined>(`# הקדמה
# מושגים בסיסיים
# החולשה
# התקיפה
# הגנה
# הרחבה ומקורות נוספים
[Learn
Markdown](https://www.markdowntutorial.com)`);

	const [editorTheme, setEditorTheme] = useState<'light' | 'dark'>('light');

	return (
		<div
			className="flex-1 flex flex-col items-center justify-center p-2"
			dir="ltr"
			{...props}
			data-color-mode={editorTheme}
		>
			<button
				className={`border-4 rounded-lg p-2 mb-2 font-semibold ${
					editorTheme === 'light'
						? 'bg-white text-black'
						: 'bg-neutral-800 border-neutral-900 dark:border-none text-white'
				}`}
				onClick={() => setEditorTheme(editorTheme === 'light' ? 'dark' : 'light')}
			>
				Toggle Theme
			</button>
			<MarkdownEditor
				value={value}
				onChange={setValue}
				className="flex-1 min-w-[56rem]"
				visible
				toolbars={[
					'bold',
					'italic',
					'header',
					'strike',
					'underline',
					'quote',
					'olist',
					'ulist',
					'link',
					'todo',
					'image',
				]}
				toolbarsMode={['preview', 'fullscreen']}
			/>
		</div>
	);
};

export const getServerSideProps = setProtectedView();

export default Edit;
