import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ReactNode, useEffect } from 'react';
import { joinClasses, mergeClasses } from '@/utils/classname-utils';
import { EmblaCarouselType } from 'embla-carousel';

type Props = {
	loop?: boolean;
	skipSnaps?: boolean;
	enableAutoplay?: boolean;
	fade?: FadeType;
	className?: string;
	containerClassName?: string;
	onApiLoaded?: (api: EmblaCarouselType) => void;
	children?: ReactNode;
	onMouseEnter?: () => void;
	onMouseExit?: () => void;
};

export enum FadeType {
	None,
	Horizontal,
	Left,
	Right,
}

const Carousel = ({
	className,
	containerClassName,
	loop = false,
	skipSnaps = true,
	enableAutoplay = false,
	fade = FadeType.None,
	onApiLoaded,
	children = [],
	onMouseEnter,
	onMouseExit,
}: Props) => {
	const [ref, api] = useEmblaCarousel(
		{ loop, skipSnaps, align: 'center', axis: 'x', containScroll: 'keepSnaps' },
		enableAutoplay ? [Autoplay()] : [],
	);

	useEffect(() => {
		if (onApiLoaded == null || api == null) {
			return;
		}

		onApiLoaded?.(api);
	}, [api, onApiLoaded]);

	return (
		<div
			className={joinClasses(
				'embla',
				{
					'fade-horizontal': fade === FadeType.Horizontal,
					'fade-left': fade === FadeType.Left,
					'fade-right': fade === FadeType.Right,
				},
				className,
			)}
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseExit}>
			<div className={mergeClasses('embla__container', containerClassName)}>{children}</div>
		</div>
	);
};

type SlideProps = {
	className?: string;
	children?: ReactNode;
	onMouseEnter?: () => void;
	onMouseExit?: () => void;
};
export const Slide = ({ className, children, onMouseEnter, onMouseExit }: SlideProps) => (
	<div
		className={joinClasses('embla__slide', className)}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseExit}>
		{children}
	</div>
);

Carousel.Slide = Slide;
export default Carousel;
