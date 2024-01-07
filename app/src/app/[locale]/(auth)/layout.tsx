import { i18nConfig } from '@/i18n-config';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { I18nLocale } from '@/i18n';
import { ReactNode } from 'react';
import PageLayout from '@/components/page-layout';
import { HeaderType } from '@/models/header-type';

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

type Props = {
	children: ReactNode;
};

export default async function AuthWrapperLayout({
	children,
	params: { locale },
}: Props & I18nLocale) {
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}

	unstable_setRequestLocale(locale);

	return (
		<PageLayout headerType={HeaderType.Basic} backgroundColor='hsl(var(--twc-background-100))'>
			{children}
		</PageLayout>
	);
}
