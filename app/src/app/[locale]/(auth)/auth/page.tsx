import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { I18nLocale } from '@/i18n';

export default async function AuthPage({ params: { locale } }: I18nLocale) {
	unstable_setRequestLocale(locale);

	redirect('/auth/login', RedirectType.replace);
}
