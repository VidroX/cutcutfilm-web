import { I18nLocale } from '@/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { i18nConfig } from '@/i18n-config';
import { notFound } from 'next/navigation';
import HomePageContent from '@/app/[locale]/(main)/_components/home-page';

export default async function Home({ params: { locale } }: I18nLocale) {
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}

	unstable_setRequestLocale(locale);

	return <HomePageContent />;
}
