import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from '@/i18n-config';
import { NextRequest, NextResponse } from 'next/server';
import { Token } from '@/models/user/token';
import { getBasicApolloClient } from '@/graphql/apollo-client';
import {
	REFRESH_ACCESS_TOKEN_QUERY,
	RefreshAccessTokenQueryResponse,
} from '@/graphql/services/user/queries/refreshAccessToken';
import { decodeJwt } from 'jose';
import { RequestCookies, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

async function refreshUserToken(refreshToken: string): Promise<Token | undefined> {
	const {
		data: { refreshAccessToken },
	} = await getBasicApolloClient().query<RefreshAccessTokenQueryResponse>({
		query: REFRESH_ACCESS_TOKEN_QUERY,
		context: {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		},
	});

	return refreshAccessToken;
}

function applySetCookie(req: NextRequest, res: NextResponse): void {
	const responseCookies = new ResponseCookies(res.headers);

	const newReqHeaders = new Headers(req.headers);
	const newReqCookies = new RequestCookies(newReqHeaders);

	responseCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

	NextResponse.next({
		request: { headers: newReqHeaders },
	}).headers.forEach((value, key) => {
		if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
			res.headers.set(key, value);
		}
	});
}

export default async function middleware(request: NextRequest) {
	const handleI18nRouting = createMiddleware({
		...i18nConfig,
		localePrefix: 'as-needed',
	});

	const response = handleI18nRouting(request);

	try {
		const accessToken = request.cookies.get('at');
		const refreshToken = request.cookies.get('rt');

		if (!accessToken && refreshToken) {
			const newAccessToken = await refreshUserToken(refreshToken.value);

			if (!newAccessToken) {
				return response;
			}

			const decodedAccessToken = decodeJwt(newAccessToken.token);

			response.cookies.set('at', newAccessToken.token, {
				httpOnly: true,
				secure: true,
				expires: (decodedAccessToken.exp ?? 0) * 1000,
			});

			applySetCookie(request, response);
		}
	} catch (e) {
		if (process.env.NEXT_PUBLIC_DEBUG) {
			console.error('Unable to refresh token', e);
		}
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
