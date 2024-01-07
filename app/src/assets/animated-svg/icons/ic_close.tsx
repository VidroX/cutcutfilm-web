import * as React from 'react';
import { motion } from 'framer-motion';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const AnimatedIcClose = ({ width = 18, height = 18, color = '#fff', ...rest }: Props) => (
	<motion.svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox={`0 0 ${width} ${height}`}
		width={width}
		height={height}
		fill='none'
		{...rest}>
		<motion.path
			fill={color}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				type: 'tween',
				duration: 0.15,
				ease: 'easeInOut',
			}}
			fillRule='evenodd'
			d='M4.545 12.182a.9.9 0 0 0 1.273 1.273L9 10.273l3.182 3.182a.9.9 0 1 0 1.273-1.273L10.273 9l3.182-3.182a.9.9 0 1 0-1.273-1.273L9 7.727 5.818 4.545a.9.9 0 0 0-1.273 1.273L7.727 9l-3.182 3.182Z'
			clipRule='evenodd'
		/>
	</motion.svg>
);
export default AnimatedIcClose;
