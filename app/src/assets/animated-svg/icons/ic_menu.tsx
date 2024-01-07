import * as React from 'react';
import { motion } from 'framer-motion';

type Props = {
	width?: number;
	height?: number;
	color?: string;
};

const AnimatedIcMenu = ({ width = 18, height = 18, color = '#fff', ...rest }: Props) => (
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
			d='M2.7 4.1a.5.5 0 0 1 .5-.5h11.6a.5.5 0 0 1 .5.5v.8a.5.5 0 0 1-.5.5H3.2a.5.5 0 0 1-.5-.5v-.8Zm0 4.5a.5.5 0 0 1 .5-.5h11.6a.5.5 0 0 1 .5.5v.8a.5.5 0 0 1-.5.5H3.2a.5.5 0 0 1-.5-.5v-.8Zm.5 4a.5.5 0 0 0-.5.5v.8a.5.5 0 0 0 .5.5h11.6a.5.5 0 0 0 .5-.5v-.8a.5.5 0 0 0-.5-.5H3.2Z'
			clipRule='evenodd'
		/>
	</motion.svg>
);
export default AnimatedIcMenu;
