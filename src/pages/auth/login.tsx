import React, { useEffect, useState } from 'react';

import { UserIcon, LockClosedIcon, AtSymbolIcon } from '@heroicons/react/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import CustomHeader from '../../components/CustomHeader';
import InputLabel from '../../components/InputLabel';
import {
	RegisterSchemaType,
	RegisterSchema,
	LoginSchemaType,
	LoginSchema,
} from '../../utils/zodSchemas';

type FormState = 'idle' | 'processing' | 'successful' | 'error';

export interface LoginProps {
	providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login: NextPage<LoginProps> = ({ providers }) => {
	const router = useRouter();

	const [authType, setAuthType] = useState<'Login' | 'Register'>(
		router.query.method === 'register' ? 'Register' : 'Login',
	);
	const [formState, setFormState] = useState<FormState>('idle');
	const [serverError, setServerError] = useState<string | undefined>();

	const redirectToHome = () => {
		if (typeof router.query.callbackUrl === 'string') router.push(router.query.callbackUrl);
		else router.push('/');
	};

	const loginUser = async ({ email, password }: RegisterSchemaType) => {
		setFormState('processing');

		const res = await signIn('credentials', {
			redirect: false,
			email,
			password,
			callbackUrl: `${
				(router.query.callbackUrl &&
					((router.query.callbackUrl as string).startsWith(window.location.origin)
						? router.query.callbackUrl
						: `${window.location.origin}${router.query.callbackUrl}`)) ||
				window.location.origin
			}`,
		});

		setServerError(res?.error);
		if (res?.status && res?.status === 200) {
			setFormState('successful');
			redirectToHome();
		}
	};

	const registerUser = (data: RegisterSchemaType) => {
		setFormState('processing');
		axios
			.post('/api/register/', data)
			.then(() => {
				setServerError(undefined);
				loginUser(data);
			})
			.catch((err: AxiosError<{ error?: string }>) => {
				setServerError(err.response?.data?.error);
			});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchemaType | LoginSchemaType>({
		resolver: zodResolver(authType === 'Login' ? LoginSchema : RegisterSchema),
		reValidateMode: 'onChange',
	});

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0) setFormState('error');
		else setFormState('idle');
	}, [errors]);

	return (
		<>
			<CustomHeader />

			<form
				className="flex-1 flex flex-col items-center justify-center bg-gray-50 md:bg-gray-100 dark:bg-transparent"
				dir="ltr"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="flex flex-col items-center m-4 w-full sm:flex-none sm:w-full sm:max-w-md min-w-max bg-gray-50 dark:bg-transparent md:dark:bg-neutral-900 p-10 rounded-3xl md:border-2 dark:border-none overflow-auto">
					<h1 className="font-bold text-4xl">{authType}</h1>

					{providers &&
						Object.values(providers).map(
							(provider) =>
								provider.name !== 'Credentials' && (
									<button
										key={provider.name}
										onClick={() => {
											signIn(provider.id, {
												callbackUrl: `${
													(router.query.callbackUrl &&
														((router.query.callbackUrl as string).startsWith(window.location.origin)
															? router.query.callbackUrl
															: `${window.location.origin}${router.query.callbackUrl}`)) ||
													window.location.origin
												}`,
											});
										}}
										className="flex items-center justify-center bg-orange-500 shadow-lg shadow-orange-500/30 text-white rounded-md w-full p-4 mt-8 select-none"
									>
										<Image
											src={`${router.basePath}/assets/providers/github.png`}
											height={28}
											width={28}
											alt="github logo"
											className=""
										/>
										<p className="pl-4 text-lg font-semibold">Sign in with {provider.name}</p>
									</button>
								),
						)}

					<InputLabel
						title="Username"
						placeholder="Type your username"
						icon={UserIcon}
						register={register}
						name="username"
						className={`w-full mt-2 rounded-lg overflow-hidden shadow-lg transition-all ease-out duration-700 ${
							authType === 'Register' ? (errors.username ? 'h-[126px]' : 'h-[98px]') : 'h-0 p-0'
						}`}
						error={errors.username}
						autoComplete="name"
						disabled={formState === 'processing'}
					/>
					<InputLabel
						title="Email"
						placeholder="Type your email"
						icon={AtSymbolIcon}
						register={register}
						name="email"
						className="w-full mt-2"
						error={errors.email}
						type="email"
						autoComplete="email"
						disabled={formState === 'processing'}
					/>
					<InputLabel
						title="Password"
						placeholder="Type your password"
						icon={LockClosedIcon}
						register={register}
						name="password"
						className="w-full mt-2 mb-2"
						error={errors.password}
						type="password"
						disabled={formState === 'processing'}
					/>

					<button
						onClick={() => setAuthType(authType === 'Login' ? 'Register' : 'Login')}
						className="font-semibold"
					>
						{authType === 'Login' ? (
							<>
								Not registered yet? <span className="text-blue-600 hover:underline">Register</span>
							</>
						) : (
							<>
								Already have an account?{' '}
								<span className="text-blue-600 hover:underline">Login</span>
							</>
						)}
					</button>

					<p
						className={`text-sm text-red-500 font-semibold transition-all overflow-hidden ${
							serverError ? 'h-5 mt-4 mb-1' : 'h-0 mt-0'
						}`}
					>
						{serverError}
					</p>

					<button
						type="submit"
						className={`space-x-2 mt-6 p-4 bg-sky-900 shadow-lg shadow-sky-900/30 font-bold uppercase transition-all ease-out text-gray-300 ring-0 focus:ring-4 ring-sky-500 ring-opacity-30${
							authType === 'Register' ? ' mt-8 hover:text-white' : ' mt-6'
						}${formState === 'idle' ? ' w-full rounded-lg active:bg-sky-800' : ''}${
							formState === 'processing' ? ' w-14 h-14 rounded-full !ring-0' : ''
						}${
							/* requestState === RequestState.RECEIVED
								? 'w-14 h-14 rounded-full bg-green-500 !ring-0'
						: '' */ ' to be continued'
						}${
							formState === 'error'
								? ' bg-red-500 w-full rounded-lg active:bg-red-600 ring-red-400'
								: ''
						}`}
						disabled={formState === 'processing'}
						onClick={handleSubmit(async (data) => {
							if (authType === 'Login') await loginUser(data);
							else await registerUser(data);
						})}
					>
						{formState === 'idle' || formState === 'error'
							? authType === 'Login'
								? 'Login'
								: 'Register'
							: ''}
					</button>
				</div>
			</form>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async () => {
	const providers = await getProviders();

	return {
		props: { providers },
	};
};

export default Login;
