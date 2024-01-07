'use client';

import TextField from '@/components/text-field';
import IcUser from '@/assets/svg/icons/ic_user.svg';
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
	TRANSLATION_AUTH_ACKNOWLEDGE_TERMS,
	TRANSLATION_AUTH_AGREE_TO_TERMS_AND_CONDITIONS,
	TRANSLATION_AUTH_CONFIRM_PASSWORD,
	TRANSLATION_AUTH_EMAIL,
	TRANSLATION_AUTH_HAVE_AN_ACCOUNT,
	TRANSLATION_AUTH_LETS_GET_STARTED,
	TRANSLATION_AUTH_LOGIN_ACTION,
	TRANSLATION_AUTH_LOGIN_WITH,
	TRANSLATION_AUTH_PASSWORD,
	TRANSLATION_AUTH_PASSWORDS_DO_NOT_MATCH,
	TRANSLATION_AUTH_REGISTER,
	TRANSLATION_AUTH_USERNAME,
	TRANSLATION_COMMON_FIELD_REQUIRED,
	TRANSLATION_COMMON_PRIVACY_POLICY,
	TRANSLATION_COMMON_TERMS_OF_USE,
} from '@/translation-keys';
import Divider from '@/components/divider';
import { useRouter } from '@/navigation';
import Checkbox from '@/components/checkbox/checkbox';
import TextLinksBuilder from '@/components/text-links-builder';
import AuthSidebarContent from '@/app/[locale]/(auth)/auth/_components/auth-sidebar';
import { UserContext } from '@/contexts/user.context';
import { useMutation } from '@apollo/client';
import {
	REGISTER_MUTATION,
	RegisterMutationResponse,
	RegisterMutationVariables,
} from '@/graphql/services/user/mutations/register';
import { getFieldError } from '@/graphql/error-processor';

export default function RegisterPageContent() {
	const t = useTranslations();

	const { setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const [termsError, setTermsError] = useState<string | undefined>();
	const [passwordError, setPasswordError] = useState<string | undefined>();
	const [repeatPasswordError, setRepeatPasswordError] = useState<string | undefined>();
	const [bothPasswordError, setBothPasswordError] = useState<string | undefined>();

	const { push, replace } = useRouter();

	const [register, { loading, error, reset }] = useMutation<
		RegisterMutationResponse,
		RegisterMutationVariables
	>(REGISTER_MUTATION, {
		errorPolicy: 'all',
		variables: {
			userInfo: {
				email,
				userName,
				password,
			},
		},
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setTermsError(undefined);
		setPasswordError(undefined);
		setRepeatPasswordError(undefined);
		setBothPasswordError(undefined);
		reset();

		if (!acceptedTerms) {
			setTermsError(t(TRANSLATION_AUTH_AGREE_TO_TERMS_AND_CONDITIONS));
			return;
		}

		if (!password || password.trim().length < 1) {
			setPasswordError(t(TRANSLATION_COMMON_FIELD_REQUIRED));
			return;
		}

		if (!repeatPassword || repeatPassword.trim().length < 1) {
			setRepeatPasswordError(t(TRANSLATION_COMMON_FIELD_REQUIRED));
			return;
		}

		if (repeatPassword !== password) {
			setBothPasswordError(t(TRANSLATION_AUTH_PASSWORDS_DO_NOT_MATCH));
			return;
		}

		const result = await register();
		const apiUser = result.data?.register.user;

		if (!apiUser) {
			return;
		}

		const accessToken = result.data?.register.accessToken.token;
		const refreshToken = result.data?.register.refreshToken.token;

		if (!accessToken || !refreshToken) {
			return;
		}

		setUser?.(apiUser);

		replace('/');
	};

	return (
		<div className='flex flex-row'>
			<form onSubmit={onSubmit} className='flex w-full flex-partial flex-col lg:me-20'>
				<h6 className='mb-small'>{t(TRANSLATION_AUTH_REGISTER)}</h6>
				<TextField
					id='email'
					type='email'
					value={email}
					onValueChange={setEmail}
					error={getFieldError(error, 'email')}
					className='mb-small'
					hint={t(TRANSLATION_AUTH_EMAIL)}
					alternativeShadow
					prefix={<IcMail width='100%' fill='hsl(var(--twc-accent))' />}
					required
				/>
				<TextField
					id='username'
					value={userName}
					onValueChange={setUserName}
					error={getFieldError(error, 'username')}
					className='mb-small'
					hint={t(TRANSLATION_AUTH_USERNAME)}
					alternativeShadow
					prefix={<IcUser width='100%' fill='hsl(var(--twc-accent))' />}
					required
				/>
				<TextField
					id='password'
					value={password}
					onValueChange={setPassword}
					error={bothPasswordError ?? passwordError ?? getFieldError(error, 'password')}
					className='mb-small'
					hint={t(TRANSLATION_AUTH_PASSWORD)}
					alternativeShadow
					prefix={<IcPassword width='100%' fill='hsl(var(--twc-accent))' />}
					type='password'
					required
				/>
				<TextField
					id='repeatPassword'
					value={repeatPassword}
					onValueChange={setRepeatPassword}
					error={bothPasswordError ?? repeatPasswordError}
					className='mb-5'
					hint={t(TRANSLATION_AUTH_CONFIRM_PASSWORD)}
					alternativeShadow
					prefix={<IcPassword width='100%' fill='hsl(var(--twc-accent))' />}
					type='password'
					required
				/>
				<Checkbox
					id='acceptTerms'
					className='mb-5'
					value={acceptedTerms}
					onValueChange={setAcceptedTerms}
					error={termsError}
					required
					textChild={
						<TextLinksBuilder
							text={t(TRANSLATION_AUTH_ACKNOWLEDGE_TERMS)}
							textLinks={[
								{ text: t(TRANSLATION_COMMON_TERMS_OF_USE), link: '/terms-of-use' },
								{ text: t(TRANSLATION_COMMON_PRIVACY_POLICY), link: '/privacy-policy' },
							]}
						/>
					}
				/>
				<Button
					loading={loading}
					expanded={false}
					buttonStyle={ButtonStyle.White}
					className='mb-5 flex flex-row items-center self-start'
					type='submit'>
					<span className='me-2'>{t(TRANSLATION_AUTH_REGISTER)}</span>
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
					<span className='font-bold'>{t(TRANSLATION_AUTH_HAVE_AN_ACCOUNT)}</span>{' '}
					<span>{t(TRANSLATION_AUTH_LOGIN_ACTION)}</span>
				</div>
				<Button
					onClick={() => push('/auth/login')}
					expanded={false}
					buttonStyle={ButtonStyle.Primary}
					className='flex flex-row items-center self-start'>
					<span className='me-2'>{t(TRANSLATION_AUTH_LOGIN_ACTION)}</span>
					<IcArrowRight fill='hsl(var(--twc-text-secondary))' />
				</Button>
			</form>
			<div className='hidden w-full lg:flex lg:flex-2'>
				<AuthSidebarContent title={t(TRANSLATION_AUTH_LETS_GET_STARTED)} />
			</div>
		</div>
	);
}
