/* eslint-disable react/no-array-index-key */
import React, { FC, Fragment, ReactNode } from 'react';

import { Menu, Transition } from '@headlessui/react';

type Option = { content: ReactNode; disabled?: boolean };
type FunctionalOption = {
	content: (active: boolean, disabled: boolean) => ReactNode;
	disabled?: boolean;
};

export type OptionGroup = (Option | FunctionalOption) | (Option | FunctionalOption)[];

interface DropdownProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	groups: OptionGroup[];
	activeClass?: string;
	direction?: 'left' | 'right';
}

const Dropdown: FC<DropdownProps> = ({
	children,
	groups,
	activeClass = 'bg-gray-200 dark:bg-violet-600 dark:shadow-md dark:shadow-violet-600/30',
	className,
	direction = 'left',
	...props
}) => {
	return (
		<Menu as="div" className={`relative ${className || ''}`} {...props}>
			<Menu.Button as={Fragment}>{children}</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-50"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-50"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-50"
			>
				<Menu.Items
					className={`absolute bottom-0 translate-y-[calc(100%+1rem)] min-w-[6rem] w-max transition-all bg-gray-300 p-1 space-y-1 rounded-lg shadow-lg dark:bg-neutral-700 outline-none font-semibold overflow-hidden ${
						direction === 'left' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
					}`}
				>
					{groups.map((optionGroup, i) => (
						<div key={i}>
							<div className="px-1 py-1 bg-white dark:bg-neutral-800 rounded-lg" dir="auto">
								{Array.isArray(optionGroup) ? (
									optionGroup.map((option, j) => (
										<Menu.Item key={j} disabled={option.disabled}>
											{({ active, disabled }) => (
												<div
													className={`${
														disabled
															? 'opacity-50'
															: active
															? activeClass
															: 'text-gray-900 dark:text-gray-200'
													} text-left transition-colors rounded-md text-sm block w-full`}
												>
													{typeof option.content === 'function'
														? option.content(active, disabled)
														: option.content}
												</div>
											)}
										</Menu.Item>
									))
								) : (
									<Menu.Item key={i} disabled={optionGroup.disabled}>
										{({ active, disabled }) => (
											<div
												className={`${
													disabled
														? 'opacity-50'
														: active
														? activeClass
														: 'text-gray-900 dark:text-gray-200'
												} text-left transition-colors rounded-md text-sm block w-full`}
											>
												{typeof optionGroup.content === 'function'
													? optionGroup.content(active, disabled)
													: optionGroup.content}
											</div>
										)}
									</Menu.Item>
								)}
							</div>
						</div>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Dropdown;
