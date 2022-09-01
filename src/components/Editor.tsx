import React, { useCallback, useEffect } from 'react';

import useCodeMirror from '../hooks/useCodeMirror';

interface EditorProps {
	initialDoc: string;
	onChange: (doc: string) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
	const { onChange, initialDoc } = props;
	const handleChange = useCallback((state) => onChange(state.doc.toString()), [onChange]);
	const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
		initialDoc,
		onChange: handleChange,
	});

	useEffect(() => {
		if (editorView) {
			// Do nothing for now
		}
	}, [editorView]);

	return <div className="editor-wrapper" ref={refContainer} />;
};

export default Editor;
