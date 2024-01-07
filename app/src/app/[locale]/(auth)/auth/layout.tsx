import { unstable_setRequestLocale } from 'next-intl/server';
import { I18nLocale } from '@/i18n';
import { ReactNode } from 'react';
import { noUserOnly } from '@/app/_rsc/user';

type Props = {
	children: ReactNode;
};

export default async function AuthLayout({ children, params: { locale } }: Props & I18nLocale) {
	unstable_setRequestLocale(locale);

	await noUserOnly();

	return <>{children}</>;
}
