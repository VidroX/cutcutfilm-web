'use client';

import TextField from '@/components/text-field';
import IcMail from '@/assets/svg/icons/ic_mail.svg';
import IcPassword from '@/assets/svg/icons/ic_password.svg';
import { useTranslations } from 'next-intl';
import Button from '@/components/button/button';
import IcArrowRight from '@/assets/svg/icons/ic_arrow_right.svg';
import GoogleLogo from '@/assets/svg/google_logo.svg';
import FacebookLogo from '@/assets/svg/facebook_logo.svg';
import { ButtonSize, ButtonStyle } from '@/components/button/button.styles';
import { FormEvent, useContext, useState } from 'react';
import {
	TRANSLATION_AUTH_EMAIL_OR_USERNAME,
	TRANSLATION_AUTH_FORGOT_PASSWORD,
	TRANSLATION_AUTH_LOGIN_TITLE,
	TRANSLATION_AUTH_LOGIN_WITH,
	TRANSLATION_AUTH_NEW_TO_SITE,
	TRANSLATION_AUTH_PASSWORD,
	TRANSLATION_AUTH_REGISTER,
	TRANSLATION_AUTH_SIGN_UP,
	TRANSLATION_AUTH_WELCOME_BACK,
	TRANSLATION_COMMON_CONTINUE,
} from '@/translation-keys';
import Divider from '@/components/divider';
import { useRouter } from '@/navigation';
import Link from '@/components/link/link';
import { useMutation } from '@apollo/client';
import {
	LOGIN_MUTATION,
	LoginMutationResponse,
	LoginMutationVariables,
} from '@/graphql/services/user/mutations/login';
import { getFieldError } from '@/graphql/error-processor';
import { UserContext } from '@/contexts/user.context';
import AuthSidebarContent from '@/app/[locale]/(auth)/auth/_components/auth-sidebar';

export default function LoginPageContent() {
	const t = useTranslations();

	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');

	const { setUser } = useContext(UserContext);

	const { push, replace } = useRouter();

	const [login, { loading, error, reset }] = useMutation<
		LoginMutationResponse,
		LoginMutationVariables
	>(LOGIN_MUTATION, {
		errorPolicy: 'all',
		variables: {
			credential,
			password,
		},
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		reset();

		const result = await login();
		const apiUser = result.data?.login.user;

		if (!apiUser) {
			return;
		}

		const accessToken = result.data?.login.accessToken.token;
		const refreshToken = result.data?.login.refreshToken.token;

		if (!accessToken || !refreshToken) {
			return;
		}

		setUser?.(apiUser);

		replace('/');
	};

	return (
		<div className='flex flex-row'>
			<form onSubmit={onSubmit} className='flex w-full flex-partial flex-col lg:me-20'>
				<h6 className='mb-small'>{t(TRANSLATION_AUTH_LOGIN_TITLE)}</h6>
				<TextField
					id='email'
					value={credential}
					onValueChange={setCredential}
					error={getFieldError(error, 'email')}
					className='mb-small'
					hint={t(TRANSLATION_AUTH_EMAIL_OR_USERNAME)}
					alternativeShadow
					prefix={<IcMail width='100%' fill='hsl(var(--twc-accent))' />}
					required
				/>
				<TextField
					id='password'
					value={password}
					onValueChange={setPassword}
					error={getFieldError(error, 'password')}
					className='mb-5'
					hint={t(TRANSLATION_AUTH_PASSWORD)}
					alternativeShadow
					prefix={<IcPassword width='100%' fill='hsl(var(--twc-accent))' />}
					type='password'
					required
				/>
				<Link href='/auth/reset-password' className='mb-7 underline'>
					{t(TRANSLATION_AUTH_FORGOT_PASSWORD)}
				</Link>
				<Button
					loading={loading}
					expanded={false}
					buttonStyle={ButtonStyle.White}
					className='mb-5 flex flex-row items-center self-start'
					type='submit'>
					<span className='me-2'>{t(TRANSLATION_COMMON_CONTINUE)}</span>
					<IcArrowRight fill='hsl(var(--twc-text-primary))' />
				</Button>
				<div>
					<p className='mb-2 font-semibold'>{t(TRANSLATION_AUTH_LOGIN_WITH)}</p>
					<div className='flex flex-row'>
						<Button
							buttonSize={ButtonSize.SymmetricMedium}
							expanded={false}
							buttonStyle={ButtonStyle.White}
							className='me-2'>
							<GoogleLogo />
						</Button>
						<Button
							buttonSize={ButtonSize.SymmetricMedium}
							expanded={false}
							buttonStyle={ButtonStyle.White}>
							<FacebookLogo />
						</Button>
					</div>
				</div>
				<Divider className='my-5' />
				<div className='mb-5'>
					<span className='font-bold'>{t(TRANSLATION_AUTH_NEW_TO_SITE)}</span>{' '}
					<span>{t(TRANSLATION_AUTH_SIGN_UP)}</span>
				</div>
				<Button
					onClick={() => push('/auth/register')}
					expanded={false}
					buttonStyle={ButtonStyle.Primary}
					className='flex flex-row items-center self-start'>
					<span className='me-2'>{t(TRANSLATION_AUTH_REGISTER)}</span>
					<IcArrowRight fill='hsl(var(--twc-text-secondary))' />
				</Button>
			</form>
			<div className='hidden w-full lg:flex lg:flex-2'>
				<AuthSidebarContent title={t(TRANSLATION_AUTH_WELCOME_BACK)} />
			</div>
		</div>
	);
}
