import { getRequestConfig } from 'next-intl/server';

export interface I18nLocale {
	params: { locale: string };
}

export default getRequestConfig(async ({ locale }) => ({
	messages: (
		await (locale === 'en' ? import('../messages/en.json') : import(`../messages/${locale}.json`))
	).default,
}));
