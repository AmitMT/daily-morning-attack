import { useEffect, useState, useRef } from 'react';
import type React from 'react';

import { defaultKeymap } from '@codemirror/commands';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultHighlightStyle, HighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { indentOnInput } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { bracketMatching } from '@codemirror/matchbrackets';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view';

export const myTheme = EditorView.theme({});

const syntaxHighlighting = HighlightStyle.define([]);

interface Props {
	initialDoc: string;
	onChange?: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(
	props: Props,
): [React.MutableRefObject<T | null>, EditorView?] => {
	const refContainer = useRef<T>(null);
	const [editorView, setEditorView] = useState<EditorView>();
	const { onChange } = props;

	useEffect(() => {
		if (!refContainer.current) return;

		const startState = EditorState.create({
			doc: props.initialDoc,
			extensions: [
				keymap.of([...defaultKeymap, ...historyKeymap]),
				lineNumbers(),
				highlightActiveLineGutter(),
				history(),
				indentOnInput(),
				bracketMatching(),
				defaultHighlightStyle.fallback,
				highlightActiveLine(),
				markdown({
					base: markdownLanguage,
					codeLanguages: languages,
					addKeymap: true,
				}),
				oneDark,
				myTheme,
				syntaxHighlighting,
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.changes) {
						if (onChange) onChange(update.state);
					}
				}),
			],
		});
		if (refContainer.current.innerHTML) return;
		const view = new EditorView({
			state: startState,
			parent: refContainer.current,
		});
		setEditorView(view);
	}, [refContainer, onChange, props.initialDoc]);

	return [refContainer, editorView];
};

export default useCodeMirror;
