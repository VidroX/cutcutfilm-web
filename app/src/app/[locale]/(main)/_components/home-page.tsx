'use client';

import Arch, { ArchPointDirection } from '@/app/[locale]/(main)/_components/arch';
import Main1 from '@/assets/svg/main_1.svg';
import Main2 from '@/assets/svg/main_2.svg';
import Ic24Hours from '@/assets/svg/icons/ic_24_hours.svg';
import IcRocket from '@/assets/svg/icons/ic_rocket.svg';
import IcPig from '@/assets/svg/icons/ic_pig.svg';
import IcStar from '@/assets/svg/icons/ic_star.svg';
import IcGoogleColor from '@/assets/svg/icons/ic_google_color.svg';
import IcLike from '@/assets/svg/icons/ic_like.svg';
import { joinClasses, mergeClasses } from '@/utils/classname-utils';
import { grotesque } from '@/app/fonts';
import { useTranslations } from 'next-intl';
import {
	TRANSLATION_MAIN_ABOUT_US_DESCRIPTION,
	TRANSLATION_MAIN_ABOUT_US_TITLE,
	TRANSLATION_MAIN_ORDER_VIDEO,
	TRANSLATION_MAIN_PORTFOLIO_PRICING_PLANS_TITLE,
	TRANSLATION_MAIN_PORTFOLIO_TITLE,
	TRANSLATION_MAIN_TOP_SECTION_REVIEWS,
	TRANSLATION_MAIN_TOP_SECTION_TITLE,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_24HOURS_DESCRIPTION,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_24HOURS_TITLE,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_CHEAP_DESCRIPTION,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_CHEAP_TITLE,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_EASE_OF_USE_DESCRIPTION,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_EASE_OF_USE_TITLE,
	TRANSLATION_MAIN_TOP_SECTION_WHY_US_TITLE,
} from '@/translation-keys';
import Cursor from '@/assets/svg/cursor.svg';
import Button from '@/components/button/button';
import Container from '@/components/container/container';
import { ContainerStyle } from '@/components/container/container.styles';
import { useRouter } from '@/navigation';
import PortfolioCarousel from '@/app/[locale]/(main)/_components/portfolio-carousel';
import PricingPlans from '@/app/[locale]/(main)/_components/pricing-plans';
import TimedReviewsList from '@/app/[locale]/(main)/_components/timed-reviews-list';

const horizontalPadding = 'px-safe-area-small lg:px-safe-area';

export default function HomePageContent() {
	const t = useTranslations();

	return (
		<main className='bg-blue'>
			<div className='bg-background p-main-layout-small md:p-main-layout-medium lg:p-main-layout-large'>
				<div className='container mx-auto mb-content-medium flex flex-col items-center justify-between md:flex-row'>
					<div className='mb-11 me-0 flex grow flex-col md:mb-0 lg:me-[4.688rem]'>
						<p className='mb-small flex flex-row items-center'>
							<span className='me-small'>
								<IcStar />
							</span>
							<span className={joinClasses('me-small text-2xl font-semibold', grotesque.className)}>
								0.0
							</span>
							<span className='me-small'>
								<IcGoogleColor />
							</span>
							<span className='text-xl font-medium opacity-70'>
								({t(TRANSLATION_MAIN_TOP_SECTION_REVIEWS, { count: 0 })})
							</span>
						</p>
						<h1
							className={mergeClasses(
								'mb-medium text-main-title-small md:text-main-title-medium lg:text-main-title-large xl:text-main-title-extra-large',
								grotesque.className,
							)}>
							{t(TRANSLATION_MAIN_TOP_SECTION_TITLE)}
						</h1>
						<OrderVideoButton />
					</div>
					<Main1 className='w-full lg:min-w-[20rem] xl:min-w-[36rem]' />
				</div>
				<div className='container mx-auto'>
					<h6 className={mergeClasses('mb-medium text-lg font-bold', grotesque.className)}>
						{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_TITLE)}
					</h6>
					<div className='flex flex-col gap-medium lg:flex-row'>
						<Container containerStyle={ContainerStyle.Basic} className='flex flex-1 flex-col p-10'>
							<div className='mb-4 flex flex-row items-center'>
								<Ic24Hours className='me-4' />
								<h6
									className={mergeClasses('text-2xl font-bold md:text-2.5xl', grotesque.className)}>
									{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_24HOURS_TITLE)}
								</h6>
							</div>
							<p>{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_24HOURS_DESCRIPTION)}</p>
						</Container>
						<Container containerStyle={ContainerStyle.Basic} className='flex flex-1 flex-col p-10'>
							<div className='mb-4 flex flex-row items-center'>
								<IcRocket className='me-4' />
								<h6
									className={mergeClasses('text-2xl font-bold md:text-2.5xl', grotesque.className)}>
									{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_EASE_OF_USE_TITLE)}
								</h6>
							</div>
							<p>{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_EASE_OF_USE_DESCRIPTION)}</p>
						</Container>
						<Container containerStyle={ContainerStyle.Basic} className='flex flex-1 flex-col p-10'>
							<div className='mb-4 flex flex-row items-center'>
								<IcPig className='me-4' />
								<h6
									className={mergeClasses('text-2xl font-bold md:text-2.5xl', grotesque.className)}>
									{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_CHEAP_TITLE)}
								</h6>
							</div>
							<p>{t(TRANSLATION_MAIN_TOP_SECTION_WHY_US_CHEAP_DESCRIPTION)}</p>
						</Container>
					</div>
				</div>
			</div>
			<Arch hideOnSmallScreens={true} />
			<div className={joinClasses('py-content-small md:py-content-medium', horizontalPadding)}>
				<div
					className='container mx-auto mb-11 flex flex-col items-start justify-between md:flex-row'
					id='aboutUs'>
					<div className='mb-10 me-0 flex grow flex-col md:mb-0 md:me-[4.688rem]'>
						<h5
							className={mergeClasses(
								'mb-8 text-3.5xl font-extrabold md:mb-11 md:text-5.5xl',
								grotesque.className,
							)}>
							{t(TRANSLATION_MAIN_ABOUT_US_TITLE)}
						</h5>
						<p className='mb-8 whitespace-pre-line text-text-blue md:mb-11'>
							{t.rich(TRANSLATION_MAIN_ABOUT_US_DESCRIPTION, {
								strong: (chunks) => <span className='font-semibold'>{chunks}</span>,
							})}
						</p>
						<OrderVideoButton />
					</div>
					<Main2 className='w-full md:min-w-[20rem] lg:min-w-[28rem] xl:min-w-[34rem]' />
				</div>
			</div>
			<Arch direction={ArchPointDirection.Top} />
			<div className='bg-background pb-5 pt-5 md:pt-3 lg:pb-1'>
				<div className={joinClasses('mb-9 md:mb-[4.25rem]', horizontalPadding)}>
					<div className='container mx-auto flex w-full justify-center' id='portfolio'>
						<h5
							className={mergeClasses(
								'text-3.5xl font-extrabold md:mb-11 md:text-5.5xl',
								grotesque.className,
							)}>
							{t(TRANSLATION_MAIN_PORTFOLIO_TITLE)}
						</h5>
					</div>
				</div>
				<PortfolioCarousel className='mb-content-medium md:mb-[12.5rem]' />
				<div className={joinClasses('mb-12 md:mb-content-medium', horizontalPadding)}>
					<div className='container mx-auto' id='price'>
						<div className='mb-9 max-w-[25rem] md:mb-[3.25rem] md:max-w-[42rem]'>
							<h5
								className={mergeClasses(
									'relative text-3.5xl font-extrabold md:text-5.5xl',
									grotesque.className,
								)}>
								{t(TRANSLATION_MAIN_PORTFOLIO_PRICING_PLANS_TITLE)}
								<span className='absolute bottom-0.5 ms-8 inline-flex md:bottom-[0.75rem] md:ms-12'>
									<IcLike className='h-[2.518rem] w-[2.704rem]' />
								</span>
							</h5>
						</div>
						<PricingPlans />
					</div>
				</div>
				<div className='mb-4 px-0 md:mb-6 md:px-safe-area-small lg:mb-0 lg:px-safe-area'>
					<TimedReviewsList className='container mx-auto' />
				</div>
			</div>
			<Arch />
			<div className={joinClasses('pb-content-medium pt-[3.125rem]', horizontalPadding)}>
				<div className='container mx-auto px-0 lg:px-content-medium'>321</div>
			</div>
		</main>
	);
}

const OrderVideoButton = () => {
	const t = useTranslations();
	const { push } = useRouter();

	return (
		<Button className='flex flex-row items-center md:max-w-[12rem]' onClick={() => push('/#price')}>
			<span className='me-2'>{t(TRANSLATION_MAIN_ORDER_VIDEO)}</span>
			<Cursor />
		</Button>
	);
};
