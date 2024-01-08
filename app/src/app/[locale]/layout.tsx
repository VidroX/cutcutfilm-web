import useTextDirection from '@/hooks/use-text-direction';
import { i18nConfig } from '@/i18n-config';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import getRequestConfig, { I18nLocale } from '@/i18n';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { grotesque, inter } from '@/app/fonts';
import { cookies } from 'next/headers';
import { UserContextProvider } from '@/contexts/user.context';
import { getAndProcessUser } from '@/app/_rsc/user';
import { GlobalLoadingContextProvider } from '@/contexts/global-loading.context';

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

type Props = {
	children: ReactNode;
};

export default async function LocaleLayout({ children, params: { locale } }: Props & I18nLocale) {
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}

	unstable_setRequestLocale(locale);

	let requestConfig;
	try {
		requestConfig = await getRequestConfig({ locale });
	} catch (error) {
		notFound();
	}

	const direction = useTextDirection(locale);

	const user = await getAndProcessUser(cookies().get('at')?.value);

	return (
		<html lang={locale} dir={direction}>
			<body className={`${inter.className} ${grotesque.variable}`}>
				<GlobalLoadingContextProvider>
					<UserContextProvider defaultUser={user}>
						<NextIntlClientProvider locale={locale} messages={requestConfig.messages}>
							{children}
						</NextIntlClientProvider>
					</UserContextProvider>
				</GlobalLoadingContextProvider>
			</body>
		</html>
	);
}
