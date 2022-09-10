import React, { FC } from 'react';

import { FieldError, useForm } from 'react-hook-form';

export type InputLabelProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	title: string;
	placeholder?: string;
	icon: FC<React.ComponentProps<'svg'>>;
	optional?: boolean;
	register: ReturnType<typeof useForm<any>>['register'];
	name: string;
	error?: FieldError;
	dir?: 'ltr' | 'rtl' | 'auto';
};

const InputLabel: FC<InputLabelProps> = ({
	title,
	placeholder,
	icon: Icon,
	optional = false,
	className,
	register,
	name,
	error,
	dir,
	...props
}) => {
	return (
		<div className={className}>
			<label
				htmlFor={name}
				className="group bg-white dark:bg-neutral-800 p-4 shadow-lg dark:shadow-none rounded-lg block"
			>
				<div className="flex text-sm mb-1 font-medium text-gray-500 dark:text-gray-400 transition-colors group-focus-within:text-gray-900 dark:group-focus-within:text-gray-300">
					<h3 className="flex-1">{title}</h3>
					{optional && (
						<p className="text-sky-900 dark:text-sky-300 opacity-50 font-semibold">Optional</p>
					)}
				</div>
				<div
					className="flex justify-center items-center border-b-2 transition-colors border-b-gray-200 dark:border-b-neutral-600 group-focus-within:border-b-gray-400 dark:group-focus-within:border-b-gray-300 rounded-b-sm cursor-text"
					dir={dir || 'ltr'}
				>
					<Icon className="h-4 transition-colors text-gray-400 dark:text-gray-500 group-focus-within:text-gray-500 dark:group-focus-within:text-gray-300 mt-1" />
					<input
						className="flex-1 bg-transparent outline-none p-2 [margin-inline-start:4px] rounded-t-md"
						placeholder={placeholder}
						id={name}
						{...register(name)}
						{...props}
					/>
				</div>
				<p
					className={`text-sm text-red-500 font-semibold transition-all overflow-hidden ${
						error ? 'h-5 mt-2' : 'h-0 mt-0'
					}`}
				>
					{error?.message}
				</p>
			</label>
		</div>
	);
};

export default InputLabel;
