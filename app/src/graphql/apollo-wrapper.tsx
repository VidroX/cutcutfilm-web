'use client';

import React from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	NextSSRApolloClient,
	SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_GATEWAY_SERVICE_LOCATION,
		credentials:
			process.env.NEXT_PUBLIC_ENVIRONMENT_TYPE === 'development' ? 'include' : 'same-origin',
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
