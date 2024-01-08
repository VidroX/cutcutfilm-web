import { I18nLocale } from '@/i18n';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Container from '@/components/container/container';
import { ContainerStyle } from '@/components/container/container.styles';
import {
	TRANSLATION_AUTH_SIGN_IN,
	TRANSLATION_AUTH_WELCOME_BACK,
	TRANSLATION_COMMON_APP_NAME,
} from '@/translation-keys';
import LoginPageContent from '@/app/[locale]/(auth)/auth/login/_components/login-page';
import AuthSidebarContent from '@/app/[locale]/(auth)/auth/_components/auth-sidebar';

export async function generateMetadata({ params: { locale } }: I18nLocale): Promise<Metadata> {
	const t = await getTranslations({ locale });

	return {
		title: `${t(TRANSLATION_AUTH_SIGN_IN).toLocaleLowerCase()} • ${t(TRANSLATION_COMMON_APP_NAME)}`,
	};
}

export default async function LoginPage({ params: { locale } }: I18nLocale) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations({ locale });

	return (
		<div className='flex flex-col lg:flex-row'>
			<Container containerStyle={ContainerStyle.Blue} className='w-full px-6 py-12 lg:p-15'>
				<LoginPageContent />
			</Container>
			<Container
				containerStyle={ContainerStyle.Blue}
				className='mt-12 flex w-full flex-col px-6 py-12 lg:hidden'>
				<AuthSidebarContent title={t(TRANSLATION_AUTH_WELCOME_BACK)} />
			</Container>
		</div>
	);
}
