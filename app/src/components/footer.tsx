import { FooterType } from '@/models/footer-type';
import { Link as NextLink, useRouter } from '@/navigation';
import CutcutfilmLogo from '@/components/cutcutfilm-logo/cutcutfilm-logo';
import Link from '@/components/link/link';
import {
	TRANSLATION_COMMON_APP_NAME,
	TRANSLATION_FOOTER_CONTACT_US,
	TRANSLATION_FOOTER_FOLLOW_US,
	TRANSLATION_FOOTER_PRIVACY,
	TRANSLATION_FOOTER_TERMS,
	TRANSLATION_HEADER_ABOUT_SERVICE,
	TRANSLATION_HEADER_FAQ,
	TRANSLATION_HEADER_PORTFOLIO,
	TRANSLATION_HEADER_PRICE,
} from '@/translation-keys';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { MenuItem } from '@/models/menu-item';
import { LogoStyle } from '@/components/cutcutfilm-logo/cutcutfilm-logo.styles';
import Button from '@/components/button/button';
import { ButtonStyle } from '@/components/button/button.styles';
import { grotesque } from '@/app/fonts';
import IcTwitter from '@/assets/svg/icons/ic_twitter.svg';
import IcYouTube from '@/assets/svg/icons/ic_youtube.svg';
import IcTikTok from '@/assets/svg/icons/ic_tiktok.svg';

type Props = {
	type: FooterType;
};

const Footer = ({ type = FooterType.None }: Props) => {
	if (type === FooterType.None) {
		return <></>;
	}

	return <FullFooter />;
};

const FullFooter = () => {
	const t = useTranslations();

	const { push } = useRouter();

	const menuItems = useMemo((): MenuItem[] => {
		return [
			{
				name: t(TRANSLATION_HEADER_PORTFOLIO),
				href: '/#portfolio',
			},
			{
				name: t(TRANSLATION_HEADER_ABOUT_SERVICE),
				href: '/#aboutUs',
			},
			{
				name: t(TRANSLATION_HEADER_PRICE),
				href: '/#price',
			},
			{
				name: t(TRANSLATION_HEADER_FAQ),
				href: '/#faq',
			},
		];
	}, [t]);

	return (
		<footer>
			<div className='bg-background-inverted p-5 lg:px-[5.62rem] lg:py-20'>
				<div className='container mx-auto flex flex-col items-start text-text-secondary duration-100'>
					<div className='mb-6 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
						<NextLink href='/' className='mb-4 lg:mb-0 lg:me-4'>
							<CutcutfilmLogo logoStyle={LogoStyle.Inverted} />
						</NextLink>
						<div className='flex flex-col lg:flex-row'>
							{menuItems.map((item, index) => (
								<Link
									key={`web-footer-menu-link-${index}`}
									href={item.href}
									className={
										index === menuItems.length - 1
											? 'mb-4 p-button text-text-secondary lg:mb-0 lg:me-12'
											: 'mb-small p-button text-text-secondary lg:mb-0 lg:me-small'
									}>
									{item.name}
								</Link>
							))}
							<Button
								buttonStyle={ButtonStyle.Green}
								onClick={() => push('/contact-us')}
								className='lg:max-w-auto w-full max-w-[10.8125rem] lg:w-auto lg:min-w-[10.8125rem]'>
								{t(TRANSLATION_FOOTER_CONTACT_US)}
							</Button>
						</div>
					</div>
					<div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
						<Copyright className='hidden lg:block' />
						<div className='flex flex-col lg:flex-row'>
							<div className='mb-10 flex justify-end lg:mb-0 lg:me-10 lg:justify-start'>
								<Link href='/terms-of-use' className='me-10 text-text-secondary'>
									{t(TRANSLATION_FOOTER_TERMS)}
								</Link>
								<Link href='/privacy-policy' className='text-text-secondary'>
									{t(TRANSLATION_FOOTER_PRIVACY)}
								</Link>
							</div>
							<div className='flex justify-between lg:justify-start'>
								<p className='mb-4 cursor-default select-none text-text-secondary lg:mb-0 lg:me-6'>
									{t(TRANSLATION_FOOTER_FOLLOW_US)}
								</p>
								<Link
									href='#'
									className='mb-small flex h-6 w-6 items-center justify-center text-text-secondary lg:mb-0 lg:me-6'>
									<IcTwitter className='fill-green duration-100 hover:fill-secondary' />
								</Link>
								<Link
									href='#'
									className='mb-small flex h-6 w-6 items-center justify-center text-text-secondary lg:mb-0 lg:me-6'>
									<IcTikTok className='fill-green duration-100 hover:fill-secondary' />
								</Link>
								<Link
									href='#'
									className='mb-small flex h-6 w-6 items-center justify-center text-text-secondary lg:mb-0 lg:me-6'>
									<IcYouTube className='fill-green duration-100 hover:fill-secondary' />
								</Link>
							</div>
						</div>
						<Copyright className='mt-6 block lg:hidden' />
					</div>
				</div>
			</div>
		</footer>
	);
};

const Copyright = ({ className }: { className?: string }) => {
	const t = useTranslations();

	return (
		<p className={`${grotesque.className} font-normal${className ? ` ${className}` : ''}`}>
			&copy; {new Date().getFullYear()}{' '}
			<span className='font-bold'>{t(TRANSLATION_COMMON_APP_NAME)}</span>
		</p>
	);
};

export default Footer;
