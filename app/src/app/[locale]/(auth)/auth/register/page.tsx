import { I18nLocale } from '@/i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Container from '@/components/container/container';
import { ContainerStyle } from '@/components/container/container.styles';
import {
	TRANSLATION_AUTH_LETS_GET_STARTED,
	TRANSLATION_AUTH_SIGN_UP,
	TRANSLATION_COMMON_APP_NAME,
} from '@/translation-keys';
import RegisterPageContent from '@/app/[locale]/(auth)/auth/register/_components/register-page';
import AuthSidebarContent from '@/app/[locale]/(auth)/auth/_components/auth-sidebar';

export async function generateMetadata({ params: { locale } }: I18nLocale): Promise<Metadata> {
	const t = await getTranslations({ locale });

	return {
		title: `${t(TRANSLATION_AUTH_SIGN_UP).toLocaleLowerCase()} • ${t(TRANSLATION_COMMON_APP_NAME)}`,
	};
}

export default async function RegisterPage({ params: { locale } }: I18nLocale) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations({ locale });

	return (
		<div className='flex flex-col lg:flex-row'>
			<Container containerStyle={ContainerStyle.Blue} className='w-full px-6 py-12 lg:p-15'>
				<RegisterPageContent />
			</Container>
			<Container
				containerStyle={ContainerStyle.Blue}
				className='mt-12 flex w-full flex-col px-6 py-12 lg:hidden'>
				<AuthSidebarContent title={t(TRANSLATION_AUTH_LETS_GET_STARTED)} />
			</Container>
		</div>
	);
}
