import { User } from '@/models/user/user';
import { getClient } from '@/graphql/apollo-rsc-client';
import {
	USER_QUERY,
	UserQueryResponse,
	UserQueryVariables,
} from '@/graphql/services/user/queries/getUser';
import { cookies } from 'next/headers';
import { permanentRedirect, RedirectType } from 'next/dist/client/components/redirect';

export async function getUser(accessToken: string): Promise<User | undefined> {
	const {
		data: { user },
	} = await getClient().query<UserQueryResponse, UserQueryVariables>({
		query: USER_QUERY,
		context: { headers: { Authorization: `Bearer ${accessToken}` } },
		fetchPolicy: 'cache-first',
	});

	return user;
}

export async function getAndProcessUser(
	accessToken: string | undefined,
): Promise<User | undefined> {
	if (!accessToken) {
		return;
	}

	try {
		const user = await getUser(accessToken);

		if (!user) {
			return;
		}

		return user;
	} catch (e) {
		if (process.env.NEXT_PUBLIC_DEBUG) {
			console.error(e);
		}
	}
}

export async function requireUser(redirectTo: string = '/') {
	const accessToken = cookies().get('at')?.value;

	if (!accessToken) {
		permanentRedirect(redirectTo, RedirectType.replace);
	}

	const user = await getAndProcessUser(accessToken);

	if (!user) {
		permanentRedirect(redirectTo, RedirectType.replace);
	}
}

export async function noUserOnly(redirectTo: string = '/') {
	const accessToken = cookies().get('at')?.value;

	const user = await getAndProcessUser(accessToken);

	if (user) {
		permanentRedirect(redirectTo, RedirectType.replace);
	}
}
