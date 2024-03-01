import { joinClasses } from '@/utils/classname-utils';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
	TRANSLATION_MAIN_PORTFOLIO_HORIZONTAL,
	TRANSLATION_MAIN_PORTFOLIO_VERTICAL,
} from '@/translation-keys';
import { grotesque } from '@/app/fonts';
import Direction from '@/assets/svg/direction.svg';
import IcPlay from '@/assets/svg/icons/ic_play.svg';
import Carousel from '@/components/carousel';
import Image from 'next/image';
import { Link } from '@/navigation';
import Container from '@/components/container/container';
import { ContainerStyle } from '@/components/container/container.styles';

interface PortfolioEntry {
	title: string;
	videoUrl: string;
	previewImageUrl: string;
	orientation: 'horizontal' | 'vertical';
}

type Props = { className?: string };

const PortfolioCarousel = ({ className }: Props) => {
	const t = useTranslations();

	const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([
		{
			title: 'Horizontal Video #1',
			videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			previewImageUrl: '/png/examples/horizontal-example-1.png',
			orientation: 'horizontal',
		},
		{
			title: 'Horizontal Video #2',
			videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			previewImageUrl: '/png/examples/horizontal-example-2.png',
			orientation: 'horizontal',
		},
		{
			title: 'Vertical Video #1',
			videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			previewImageUrl: '/png/examples/vertical-example-1.png',
			orientation: 'vertical',
		},
		{
			title: 'Vertical Video #2',
			videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			previewImageUrl: '/png/examples/vertical-example-2.png',
			orientation: 'vertical',
		},
		{
			title: 'Vertical Video #3',
			videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			previewImageUrl: '/png/examples/vertical-example-3.png',
			orientation: 'vertical',
		},
	]);

	const verticalVideos = useMemo(
		() => portfolioEntries.filter((item) => item.orientation === 'vertical'),
		[portfolioEntries],
	);

	const horizontalVideos = useMemo(
		() => portfolioEntries.filter((item) => item.orientation === 'horizontal'),
		[portfolioEntries],
	);

	if (verticalVideos.length <= 0 && horizontalVideos.length <= 0) {
		return;
	}

	return (
		<div className={className}>
			{horizontalVideos.length > 0 && (
				<>
					<div className='mb-4 flex w-full flex-col items-center md:mb-7'>
						<h5 className={joinClasses('text-lg font-bold text-text-blue', grotesque.className)}>
							{t(TRANSLATION_MAIN_PORTFOLIO_HORIZONTAL)}
						</h5>
						<Direction className='me-10' />
					</div>
					<Carousel
						loop
						enableAutoplay
						className={joinClasses({ 'mb-12': verticalVideos.length > 0 })}
						containerClassName='gap-[1.281rem] md:gap-medium md:justify-center'>
						{horizontalVideos.map((item, index) => (
							<Carousel.Slide
								key={`portfolio-horizontal-${index}`}
								className={joinClasses(
									'relative flex h-[11.625rem] w-full shrink-0 basis-[21rem] rounded md:h-[16.25rem] md:basis-[29.313rem]',
									{
										'ms-[0.641rem] md:ms-[0.938rem]': index === 0,
										'me-[0.641rem] md:me-[0.938rem]': index === horizontalVideos.length - 1,
									},
								)}>
								<Link
									href={item.videoUrl}
									title={item.title}
									className='relative flex h-full w-[21rem] items-center justify-center md:w-[29.313rem]'
									rel='noopener noreferrer'
									target='_blank'>
									<Image
										priority
										fill={true}
										src={item.previewImageUrl}
										alt={item.title}
										className='h-full w-auto'
										sizes='(max-width: 768px) 336px, (min-width: 768px) 469px'
									/>
								</Link>
								<PlayButton />
							</Carousel.Slide>
						))}
					</Carousel>
				</>
			)}
			{verticalVideos.length > 0 && (
				<>
					<div className='mb-4 flex w-full flex-col items-center md:mb-7'>
						<h5 className={joinClasses('text-lg font-bold text-text-blue', grotesque.className)}>
							{t(TRANSLATION_MAIN_PORTFOLIO_VERTICAL)}
						</h5>
						<Direction className='me-10' />
					</div>
					<Carousel
						loop
						enableAutoplay
						containerClassName='gap-[1.281rem] md:gap-medium md:justify-center'>
						{verticalVideos.map((item, index) => (
							<Carousel.Slide
								key={`portfolio-vertical-${index}`}
								className={joinClasses(
									'relative flex h-[20.5rem] shrink-0 basis-[11.5rem] rounded md:h-[30rem] md:basis-[16.875rem]',
									{
										'ms-[0.641rem] md:ms-[0.938rem]': index === 0,
										'me-[0.641rem] md:me-[0.938rem]': index === verticalVideos.length - 1,
									},
								)}>
								<Link
									href={item.videoUrl}
									title={item.title}
									className='relative flex h-full w-[11.5rem] items-center justify-center md:w-[16.875rem]'
									rel='noopener noreferrer'
									target='_blank'>
									<Image
										priority
										fill={true}
										src={item.previewImageUrl}
										alt={item.title}
										className='h-full w-auto'
										sizes='(max-width: 768px) 184px, (min-width: 768px) 270px'
									/>
								</Link>
								<PlayButton />
							</Carousel.Slide>
						))}
					</Carousel>
				</>
			)}
		</div>
	);
};

const PlayButton = () => {
	return (
		<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center'>
			<div className='flex h-12 w-12 flex-col items-center justify-center rounded-full border border-primary bg-secondary-300 shadow-container-alternative shadow-secondary-950 drop-shadow md:h-[4.25rem] md:w-[4.25rem]'>
				<IcPlay className='h-full max-h-7 w-full max-w-6 md:max-h-[2.375rem] md:max-w-[2.063rem]' />
			</div>
		</div>
	);
};

export default PortfolioCarousel;
