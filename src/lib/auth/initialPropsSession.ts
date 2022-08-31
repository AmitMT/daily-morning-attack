import { NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type SetInitialProtectedView = <IP extends { [key: string]: any } = {}>(
	getInitialProps?: (context: NextPageContext, session: Session) => Promise<IP> | IP,
) => (
	context: NextPageContext,
) => Promise<IP & { session: Session | null }> | (IP & { session: Session | null });

export const setInitialProtectedView: SetInitialProtectedView = (getInitialProps) => {
	return async (context) => {
		const { req, res, pathname } = context;
		// res?.setHeader('Cache-Control', 'no-store');
		const session = await getSession({ req });

		if (!res) return { session: null };
		if (!session) {
			res.statusCode = 302;
			res.setHeader('Location', `/auth/login?callbackUrl=${pathname}`);
			return { session: null };
		}
		const anyResult = (await (getInitialProps
			? getInitialProps(context, session)
			: (async () => {
					return {};
			  })())) as any;

		if (anyResult) anyResult.session = session;
		else return { session };
		return anyResult;
	};
};

type SetInitialSessionView = <IP extends { [key: string]: any } = {}>(
	getInitialProps?: (context: NextPageContext) => Promise<IP> | IP,
) => (
	context: NextPageContext,
) => Promise<IP & { session: Session | null }> | (IP & { session: Session | null });

export const setInitialSessionView: SetInitialSessionView = (getInitialProps) => {
	return async (context) => {
		const [result, session] = await Promise.all([
			getInitialProps
				? getInitialProps(context)
				: (async () => {
						return {};
				  })(),
			getSession(context),
		]);
		// context.res?.setHeader('Cache-Control', 'no-store');

		const anyResult = result as any;
		if (anyResult) anyResult.session = session;
		else return { session };
		return anyResult;
	};
};
