import { ParsedUrlQuery } from 'querystring';

import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	PreviewData,
} from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type SetProtectedView = <
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData,
>(
	getServerSideProps?: (
		context: GetServerSidePropsContext<Q, D>,
		session: Session,
	) => Promise<GetServerSidePropsResult<P>>,
) => GetServerSideProps<P & { session: Session | null }, Q, D>;

export const setProtectedView: SetProtectedView = (getServerSideProps) => {
	return async (context) => {
		const { req, res, resolvedUrl } = context;
		const session = await getSession({ req });
		if (!session) {
			res.statusCode = 302;
			res.setHeader('Location', `/auth/login?callbackUrl=${resolvedUrl}`);
			return { props: { session: null } };
		}
		const anyResult = (await (getServerSideProps
			? getServerSideProps(context, session)
			: (async () => {
					return { props: {} };
			  })())) as any;

		if (anyResult.props) anyResult.props.session = session;
		else anyResult.prop = { session };
		console.log({ anyResult });

		return anyResult;
	};
};

type SetSessionView = <
	P extends { [key: string]: any } = { [key: string]: any },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
	D extends PreviewData = PreviewData,
>(
	getServerSideProps?: GetServerSideProps<P, Q, D>,
) => GetServerSideProps<P & { session: Session | null }, Q, D>;

export const setSessionView: SetSessionView = (getServerSideProps) => {
	return async (context) => {
		const [result, session] = await Promise.all([
			getServerSideProps
				? getServerSideProps(context)
				: (async () => {
						return { props: {} };
				  })(),
			getSession(context),
		]);

		const anyResult = result as any;
		if (anyResult.props) anyResult.props.session = session;
		else anyResult.prop = { session };
		return anyResult;
	};
};
