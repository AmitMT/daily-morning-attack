import React, { useCallback, useState } from 'react';

import { NextPage } from 'next';

import Editor from '../components/Editor';
import Preview from '../components/Preview';
import { setServerSideProtectedView } from '../lib/auth/serverSideSession';

const MarkdownHelper: NextPage<{}> = () => {
	const [value, setValue] = useState(`# כותרת 1
## כותרת 2
### כותרת 3

טקסט **טקסט** *טקסט* ~~טקסט~~

---

**רשימה:**
1. פריט ראשון
2. פריט שני
3. פריט שלישי

**רשימה לא מסודרת:**
- פריט
- פריט
- פריט

**רשימת מלאי:**
- [ ] פריט
- [x] פריט
- [ ] פריט

> "ציטוט"

\`\`\`js
const message = "write code here in many supported languages";
\`\`\`

[לינק](https://www.example.com)

| עמודה | עמודה |
| ---- | ----- |
| תוכן | תוכן |
| תוכן | תוכן |

הערת שוליים. [^1]
[^1]: תוכן הערת שוליים.

![תמונה](https://www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg)`);

	const handleChange = useCallback((newValue: string) => {
		setValue(newValue);
	}, []);

	return (
		<div className="flex-1 flex flex-col">
			<div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-transparent p-14">
				<h1 className="flex font-bold text-6xl mb-5">Markdown Cheatsheet</h1>
			</div>
			<div className="flex-1 flex flex-col p-5 bg-gray-100 dark:bg-neutral-900 w-full">
				<div className="[flex:1_1_auto] flex h-0 overflow-hidden rounded-lg relative edit-view">
					<Editor onChange={handleChange} initialDoc={value} />
					<Preview doc={value} />
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = setServerSideProtectedView();

export default MarkdownHelper;
