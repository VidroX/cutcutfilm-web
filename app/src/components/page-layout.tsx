'use client';

import { ReactNode, useContext } from 'react';
import Header from '@/components/header/header';
import { HeaderType } from '@/models/header-type';
import SpinnerOverlay from '@/components/spinner-overlay';
import { GlobalLoadingContext } from '@/contexts/global-loading.context';
import Footer from '@/components/footer';
import { FooterType } from '@/models/footer-type';

type Props = {
	footerType?: FooterType;
	className?: string;
	headerType?: HeaderType;
	backgroundColor?: string;
	children: ReactNode;
};

export default function PageLayout({
	children,
	headerType = HeaderType.None,
	backgroundColor = 'hsl(var(--twc-background))',
	className = 'container mx-auto py-12 lg:py-content',
	footerType = FooterType.None,
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
			<main>
				<SpinnerOverlay className={className} loading={loading}>
					{children}
				</SpinnerOverlay>
			</main>
			<Footer type={footerType} />
		</>
	);
}
