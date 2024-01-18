'use client';

import { ReactNode, useContext } from 'react';
import Header from '@/components/header/header';
import { HeaderType } from '@/models/header-type';
import SpinnerOverlay from '@/components/spinner-overlay';
import { GlobalLoadingContext } from '@/contexts/global-loading.context';

type Props = {
	headerType?: HeaderType;
	backgroundColor?: string;
	children: ReactNode;
};

export default function PageLayout({
	children,
	headerType = HeaderType.None,
	backgroundColor = 'hsl(var(--twc-background))',
}: Props) {
	const { loading } = useContext(GlobalLoadingContext);

	return (
		<>
			<style jsx global>
				{`
					body {
						background-color: ${backgroundColor};
						position: relative;
					}
				`}
			</style>
			<Header headerType={headerType} />
			<main className='px-5'>
				<SpinnerOverlay className='container mx-auto py-12 lg:py-content' loading={loading}>
					{children}
				</SpinnerOverlay>
			</main>
		</>
	);
}
