'use client';

import moduleStyles from './content-loader.module.scss';
import { CSSProperties, ReactNode, useMemo } from 'react';
import {
	ContentLoaderStyle,
	ContentLoaderStyles,
} from '@/components/content-loader/content-loader.styles';
import { joinClasses, mergeClasses } from '@/utils/classname-utils';
import useBreakpoints, { ScreenSize } from '@/hooks/use-breakpoints';
import { motion, MotionValue, useTransform } from 'framer-motion';

type Props = {
	animated?: boolean;
	enabled?: boolean;
	scaleEnabled?: boolean;
	loaderStyle?: ContentLoaderStyle;
	containerSizeInRem?: number;
	percentage?: MotionValue<number>;
	className?: string;
	children: ReactNode;
	style?: CSSProperties;
	onClick?: () => void;
};

const ContentLoader = ({
	className = '',
	enabled = false,
	scaleEnabled = true,
	containerSizeInRem,
	percentage,
	loaderStyle = ContentLoaderStyle.Blue,
	children,
	style,
	onClick,
	...rest
}: Props) => {
	const loaderStyleMap = useMemo(() => ContentLoaderStyles.getColorMap(loaderStyle), [loaderStyle]);
	const isSmallScreen = useBreakpoints(ScreenSize.Medium, false);

	const radius = 47;
	const circumreference = Math.PI * 2 * radius;

	const strokeDashArray = useTransform(
		percentage ?? new MotionValue<number>(),
		(value) => `${value * circumreference} ${circumreference}`,
	);

	const scaledContainerSize = useMemo(() => {
		if (containerSizeInRem != null) {
			return containerSizeInRem;
		}

		if (!enabled || !scaleEnabled) {
			return isSmallScreen ? 5 : 7;
		}

		return isSmallScreen ? 7 : 9.875;
	}, [containerSizeInRem, enabled, scaleEnabled, isSmallScreen]);

	return (
		<motion.div
			onClick={onClick}
			className={mergeClasses(
				'relative flex items-center justify-center',
				{ 'cursor-pointer': onClick != null },
				className,
				moduleStyles['loader-container'],
			)}
			style={
				{
					//'--loading-percent': percentage != null ? percentage * 100 : undefined,
					'--rem-container-size': scaledContainerSize,
					...style,
				} as CSSProperties
			}
			{...rest}>
			<div
				className={joinClasses(
					'pointer-events-none flex select-none items-center justify-center overflow-hidden rounded-full',
					moduleStyles['loader-content'],
				)}
				style={{ backgroundColor: loaderStyleMap.contentColor }}>
				{children}
			</div>
			{enabled && (
				<motion.svg
					viewBox='0 0 100 100'
					xmlns='http://www.w3.org/2000/svg'
					className={joinClasses('h-full w-full', moduleStyles.loader)}>
					<motion.circle
						cx='50'
						cy='50'
						r={radius}
						className={moduleStyles['loader-circle-inner']}
						style={{ stroke: loaderStyleMap.innerLoaderColor }}
					/>
					{percentage && (
						<motion.circle
							cx='50'
							cy='50'
							r={radius}
							className={moduleStyles['loader-circle-outer']}
							animate={{
								strokeDasharray: strokeDashArray.get(),
							}}
							style={{
								stroke: loaderStyleMap.outerLoaderColor,
							}}
						/>
					)}
				</motion.svg>
			)}
		</motion.div>
	);
};

export default ContentLoader;
