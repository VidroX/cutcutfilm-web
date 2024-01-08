import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { fetchWithTimeout, REQUEST_TIMEOUT } from '@/graphql/apollo-client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const { getClient } = registerApolloClient(
	() =>
		new ApolloClient({
			cache: new InMemoryCache(),
			credentials:
				process.env.NEXT_PUBLIC_ENVIRONMENT_TYPE === 'development' ? 'include' : 'same-origin',
			link: new HttpLink({
				uri: process.env.NEXT_PUBLIC_GATEWAY_SERVICE_LOCATION,
				credentials:
					process.env.NEXT_PUBLIC_ENVIRONMENT_TYPE === 'development' ? 'include' : 'same-origin',
				fetch: (uri, options) => fetchWithTimeout(uri, options, REQUEST_TIMEOUT),
			}),
		}),
);
