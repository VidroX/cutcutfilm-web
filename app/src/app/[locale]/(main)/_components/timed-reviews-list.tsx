import { joinClasses, mergeClasses } from '@/utils/classname-utils';
import ContentLoader from '@/components/content-loader/content-loader';
import Carousel, { FadeType } from '@/components/carousel';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ContentLoaderStyle } from '@/components/content-loader/content-loader.styles';
import { EmblaCarouselType } from 'embla-carousel';
import { useMotionValue, useTime, useTransform } from 'framer-motion';

interface ReviewEntry {
	reviewerName: string;
	review: string;
	previewImageUrl: string;
}

type Props = { className?: string; carouselClassName?: string; durationPerItemMs?: number };

const loaderStyles = [
	ContentLoaderStyle.Blue,
	ContentLoaderStyle.Accent,
	ContentLoaderStyle.Yellow,
	ContentLoaderStyle.Green,
];

const TimedReviewsList = ({ className, carouselClassName, durationPerItemMs = 5000 }: Props) => {
	const [api, setApi] = useState<EmblaCarouselType | undefined>();
	const [selectedId, setSelectedId] = useState(1);
	const [isPaused, setPaused] = useState(false);

	const time = useTime();
	const loadingPercentage = useTransform(time, [0, durationPerItemMs], [0, 1]);

	const [reviews, setReviews] = useState<ReviewEntry[]>([
		{
			reviewerName: 'Developer',
			review:
				'Our video creation service specializes in producing high-quality videos for a wide range of purposes, including marketing, branding, events, and more. We cater to businesses and individuals looking to leverage the power of video content.',
			previewImageUrl: '/png/examples/reviewer-1.png',
		},
		{
			reviewerName: 'Reviewer 2',
			review:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat eget ex vel ornare. Duis rutrum porttitor sapien vitae vulputate. Suspendisse bibendum orci non facilisis luctus. Nulla fringilla rutrum neque scelerisque ornare. Pellentesque gravida purus at eros ornare tempor.',
			previewImageUrl: '/png/examples/reviewer-2.png',
		},
		{
			reviewerName: 'Reviewer 3',
			review:
				'Pellentesque eros quam, finibus eget ultricies non, facilisis in massa. Praesent ornare nunc felis, id auctor nunc finibus vel. Duis vitae feugiat sem, vel interdum mi. Praesent sit amet pharetra nibh. Nam elementum sit amet arcu sagittis convallis. Nunc sagittis eros et sodales ultrices. In eget imperdiet turpis.',
			previewImageUrl: '/png/examples/reviewer-3.png',
		},
		{
			reviewerName: 'Reviewer 4',
			review:
				'Nunc quis aliquet dui. Suspendisse vitae euismod erat. Ut eget massa quis diam ullamcorper commodo vel sed ligula.',
			previewImageUrl: '/png/examples/reviewer-4.png',
		},
	]);

	const fadeType: FadeType = useMemo(() => {
		if (selectedId === 1) {
			return FadeType.Right;
		}

		if (selectedId === reviews.length) {
			return FadeType.Left;
		}

		return FadeType.Horizontal;
	}, [reviews.length, selectedId]);

	return (
		<div className={mergeClasses('flex w-full flex-col duration-150 lg:flex-row', className)}>
			<div className='flex lg:w-0 lg:flex-1'>
				<Carousel
					fade={fadeType}
					onApiLoaded={(emblaApi) => setApi(emblaApi)}
					className='w-full'
					containerClassName={mergeClasses('gap-6 md:gap-[2.125rem]', carouselClassName)}
					onMouseExit={() => setPaused(false)}>
					{reviews.map((item, index) => (
						<Carousel.Slide
							key={`review-${index}`}
							className={joinClasses('flex shrink-0 items-center', {
								'ms-[0.641rem] md:ms-0': index === 0,
								'me-[0.641rem] md:me-0': index === reviews.length - 1,
							})}>
							<ContentLoader
								onClick={() => {
									time.set(0);
									loadingPercentage.set(0);
									setPaused(true);
									setSelectedId(index + 1);
									api?.scrollTo(index, true);
								}}
								enabled={selectedId === index + 1}
								percentage={
									selectedId === index + 1 && loadingPercentage.get() > 0
										? loadingPercentage
										: undefined
								}
								loaderStyle={loaderStyles[index % loaderStyles.length]}>
								<Image
									priority
									fill={true}
									src={item.previewImageUrl}
									alt={item.reviewerName}
									className='h-full w-full object-scale-down p-2'
									sizes='(max-width: 768px) 96px, (min-width: 768px) 136px'
								/>
							</ContentLoader>
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
			<div className='mt-10 flex flex-col px-safe-area-small md:mt-14 md:px-0 lg:ms-14 lg:mt-0 lg:w-0 lg:flex-1'>
				<p className='mb-4'>“{reviews[selectedId - 1]?.review}”</p>
				<p className='font-bold'>{reviews[selectedId - 1]?.reviewerName}</p>
			</div>
		</div>
	);
};

export default TimedReviewsList;
