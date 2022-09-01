import React from 'react';

import { NextPage } from 'next';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactLinkify from 'react-linkify';

import CustomHeader from '../components/CustomHeader';
import HallOfFame from '../components/HallOfFame';
import { setServerSideSessionView } from '../lib/auth/serverSideSession';
import hatkafaExs from '../utils/hatkafa-exs';

type PageProps = {
	session: Session | null;
};

const Index: NextPage<PageProps> = () => {
	const router = useRouter();

	const linksBuilder = (href: string, text: string, key: number) => (
		<a href={href} key={key} target="_blank" rel="noreferrer" dir="auto">
			{text}
		</a>
	);

	return (
		<>
			<CustomHeader />

			<div className="relative z-10 bg-slate-900 shadow-gray-500 dark:shadow-none shadow-xl">
				<Image
					src={`${router.basePath}/main_background.jpg`}
					className="-z-50 opacity-80 blur-sm brightness-200 dark:opacity-90 dark:brightness-90 saturate-[.75] dark:saturate-[.5] w-full h-full transition-all pointer-events-none select-none"
					layout="fill"
					objectFit="cover"
					alt="main background"
					priority
				/>
				<section className="flex flex-col justify-center items-center h-[65vh] min-h-[400px]">
					<h1 className="font-bold text-6xl mb-10 text-white text-center">ברוכים הבאים</h1>
					<p className="text-center mx-4 md:mx-0 md:w-1/2 font-semibold text-xl text-white dark:text-gray-200">
						תקיפת בוקר יומית היא יוזמה חברתית והתנדבותית בתחומים של אבטחת מידע ובמיוחד של סייבר
						התקפי. מידי בוקר שולחים מאמר קצר שכתבו על תקיפה, חולשה, הגנה או משהו אחר שמעניין אותם עם
						היבט התקפי והסבירו בצורה פשוטה וקריאה להבנה.
					</p>
				</section>
			</div>

			<div className="text-center">
				<h2 className="text-xl">Temp links</h2>
				<div>
					<button onClick={() => signIn()}>login</button>
					<br />
					<button onClick={() => signOut()}>signOut</button>
				</div>

				<Link href="/cyber-attacks/1/edit">
					<a>Edit an Attack</a>
				</Link>
			</div>

			<section className="flex flex-col-reverse lg:flex-row p-5 md:p-10 bg-gray-100 dark:bg-neutral-900 gap-10 break-words">
				<article className="flex-1 p-2 pb-0 min-w-0">
					<h2 className="font-bold text-2xl text-slate-500 dark:text-slate-300 mb-10 text-center">
						התקפת הבוקר היומית
					</h2>
					<div className="p-10 rounded-3xl border-2 border-r-0 dark:border-none bg-gray-50 dark:bg-neutral-800">
						<h1 className="font-bold text-3xl mb-2">Windows Utilman Attack</h1>
						<h3 className="font-semibold mb-5">כתב: רן דוד </h3>
						<p className="whitespace-pre-wrap dark:text-gray-300">
							<ReactLinkify componentDecorator={linksBuilder}>{hatkafaExs}</ReactLinkify>
						</p>
					</div>
				</article>
				<div className="w-[6px] bg-gray-300 dark:bg-neutral-600 rounded-full" />
				<article className="flex-1 flex flex-col min-w-0">
					<h2 className="font-bold text-2xl text-slate-500 dark:text-slate-300 mb-10 text-center">
						היכל התהילה
					</h2>
					<HallOfFame amount={30} />
				</article>
			</section>
		</>
	);
};

export const getServerSideProps = setServerSideSessionView();

export default Index;
