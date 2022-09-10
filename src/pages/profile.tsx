import React, { useEffect, useState } from 'react';

import { UserIcon, AtSymbolIcon } from '@heroicons/react/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import CustomHeader from '../components/CustomHeader';
import InputLabel from '../components/InputLabel';
import { setServerSideProtectedView } from '../lib/auth/serverSideSession';
import { ProfileSettingsSchemaType, ProfileSettingsSchema } from '../utils/zodSchemas';

type FormState = 'idle' | 'processing' | 'successful' | 'error';

export interface ProfileProps {
	session: Session;
}

const Profile: NextPage<ProfileProps> = ({ session, ...props }) => {
	const [formState, setFormState] = useState<FormState>('idle');
	const [serverError, setServerError] = useState<string | undefined>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileSettingsSchemaType>({
		resolver: zodResolver(ProfileSettingsSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			username: session.user?.name || undefined,
		},
	});

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) {
			setFormState('error');
		} else if (formState !== 'idle') setFormState('idle');
	}, [errors]);

	return (
		<>
			<CustomHeader />

			<form
				className="flex-1 flex items-center justify-center bg-gray-50 md:bg-gray-100 dark:bg-transparent"
				onSubmit={(e) => e.preventDefault()}
				{...props}
			>
				<section className="flex flex-col items-center m-4 w-full sm:flex-none sm:w-full sm:max-w-md min-w-max bg-gray-50 dark:bg-transparent md:dark:bg-neutral-900 p-10 rounded-3xl md:border-2 dark:border-none overflow-auto">
					<h1 className="font-bold text-4xl mb-8">פרופיל</h1>

					<InputLabel
						title="שם משתמש"
						placeholder="הכנס את שם המשתמש שלך"
						icon={UserIcon}
						register={register}
						name="username"
						className={`w-full mt-2 rounded-lg overflow-hidden shadow-lg transition-all ease-out duration-700 ${
							errors.username ? 'h-[126px]' : 'h-[98px]'
						}`}
						error={errors.username}
						autoComplete="name"
						disabled={formState === 'processing'}
					/>

					<InputLabel
						register={register}
						value={session.user?.email || undefined}
						title="אימייל"
						placeholder="הכנס את האימייל שלך"
						icon={AtSymbolIcon}
						name="email"
						className="w-full mt-2"
						type="email"
						autoComplete="email"
						disabled
					/>

					<p
						className={`text-sm text-red-500 font-semibold transition-all overflow-hidden ${
							serverError ? 'h-5 mt-4 mb-1' : 'h-0 mt-0'
						}`}
					>
						{serverError}
					</p>

					<button
						type="submit"
						className="space-x-2 mt-6 p-4 bg-sky-900 shadow-lg shadow-sky-900/30 font-bold uppercase transition-all ease-out text-gray-300 ring-0 focus:ring-4 ring-sky-500 ring-opacity-30 rounded-lg"
						disabled={formState === 'processing'}
						onClick={handleSubmit(async (data) => {
							setFormState('processing');
							await axios
								.post('/api/users/update/', data)
								.then(() => {
									setServerError(undefined);
								})
								.catch((err: AxiosError<{ error?: string }>) => {
									setServerError(err.response?.data?.error);
								});
							setFormState('idle');
							signOut();
						})}
					>
						עדכן נתונים
					</button>
				</section>
			</form>
		</>
	);
};

export const getServerSideProps = setServerSideProtectedView();

export default Profile;
