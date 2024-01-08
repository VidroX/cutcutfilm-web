import { I18nLocale } from '@/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { i18nConfig } from '@/i18n-config';
import { notFound } from 'next/navigation';

export default async function Portfolio({ params: { locale } }: I18nLocale) {
	if (!i18nConfig.locales.includes(locale)) {
		notFound();
	}

	unstable_setRequestLocale(locale);

	return <div>123</div>;
}
