import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const REQUEST_TIMEOUT: number = 2000;

export const fetchWithTimeout = (
	uri: RequestInfo | URL,
	options: RequestInit | undefined,
	timeout: number,
): Promise<Response> => {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject('Request timeout'), timeout);

		fetch(uri, options).then(
			(response) => {
				clearTimeout(timer);
				resolve(response);
			},
			(err) => {
				clearTimeout(timer);
				reject(err);
			},
		);
	});
};

export function getBasicApolloClient() {
	return new ApolloClient({
		cache: new InMemoryCache(),
		credentials:
			process.env.NEXT_PUBLIC_ENVIRONMENT_TYPE === 'development' ? 'include' : 'same-origin',
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GATEWAY_SERVICE_LOCATION,
			credentials:
				process.env.NEXT_PUBLIC_ENVIRONMENT_TYPE === 'development' ? 'include' : 'same-origin',
			fetch: (uri, options) => fetchWithTimeout(uri, options, REQUEST_TIMEOUT),
		}),
	});
}
