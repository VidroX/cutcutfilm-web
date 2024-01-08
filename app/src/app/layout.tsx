import './globals.scss';

import { ReactNode } from 'react';
import { ApolloWrapper } from '@/graphql/apollo-wrapper';
import { Metadata } from 'next';
import { DefaultTemplateString } from 'next/dist/lib/metadata/types/metadata-types';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: {
			default: 'cutcutfilm',
		} as DefaultTemplateString,
	};
}

type Props = {
	children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
	return <ApolloWrapper>{children}</ApolloWrapper>;
}
