import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { defaultSchema } from 'hast-util-sanitize';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkReact from 'remark-react';
import { unified } from 'unified';

import RemarkCode from './RemarkCode';

interface Props {
	doc: string;
}

const schema = {
	...defaultSchema,
	attributes: {
		...defaultSchema.attributes,
		code: [...(defaultSchema.attributes?.code || []), 'className'],
	},
};

const Preview: React.FC<Props> = (props) => {
	const md = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkReact, {
			createElement: React.createElement,
			sanitize: schema,
			remarkReactComponents: {
				code: RemarkCode,
			},
		})
		.processSync(props.doc).result;
	return (
		<div className="preview markdown-body" id="markdown-preview">
			{md}
		</div>
	);
};

export default Preview;
