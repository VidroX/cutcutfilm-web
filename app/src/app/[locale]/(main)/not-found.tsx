import { I18nLocale } from '@/i18n';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TRANSLATION_COMMON_APP_NAME, TRANSLATION_ERRORS_404_NOT_FOUND } from '@/translation-keys';
import NotFoundContent from '@/app/[locale]/_components/not-found-content';

export async function generateMetadata({ params: { locale } }: I18nLocale): Promise<Metadata> {
	const t = await getTranslations({ locale });

	return {
		title: `${t(TRANSLATION_ERRORS_404_NOT_FOUND).toLocaleLowerCase()} • ${t(
			TRANSLATION_COMMON_APP_NAME,
		)}`,
	};
}

export default async function MainNotFoundPage() {
	return <NotFoundContent />;
}
