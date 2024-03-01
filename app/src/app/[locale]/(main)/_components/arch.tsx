'use client';

import { joinClasses } from '@/utils/classname-utils';

export enum ArchPointDirection {
	Top,
	Bottom,
}

type Props = {
	height?: number;
	color?: string;
	direction?: ArchPointDirection;
	hideOnSmallScreens?: boolean;
};

const Arch = ({
	color = 'hsl(var(--twc-background))',
	direction = ArchPointDirection.Bottom,
	hideOnSmallScreens = false,
	height,
}: Props) => {
	return (
		<div
			className={joinClasses({
				hidden: hideOnSmallScreens,
				'md:block': hideOnSmallScreens,
			})}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='100%'
				height={height}
				fill={color}
				viewBox='0 0 1440 86'
				preserveAspectRatio='none'
				className={joinClasses({
					'rotate-180': direction === ArchPointDirection.Bottom,
					'h-4 md:h-[3.75rem] lg:h-[5rem]': height == null,
				})}>
				<path d='M690.033.045a2528.102 2528.102 0 0 0-418.168 37.36L0 85.997v.022h1439.994v-.036l-331.383-53.576A2527.96 2527.96 0 0 0 690.033.045Z' />
			</svg>
		</div>
	);
};

export default Arch;
