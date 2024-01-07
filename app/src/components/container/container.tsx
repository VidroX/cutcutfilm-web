'use client';

import { CSSProperties, ReactNode, useMemo } from 'react';
import { ContainerStyle, ContainerStyles } from '@/components/container/container.styles';
import { motion } from 'framer-motion';

type Props = {
	animated?: boolean;
	containerStyle?: ContainerStyle;
	className?: string;
	children: ReactNode;
	style?: CSSProperties;
};

const Container = ({
	className = '',
	containerStyle = ContainerStyle.Primary,
	animated = false,
	children,
	style,
	...rest
}: Props) => {
	const containerStyles = useMemo(
		() => ContainerStyles.composeStyles(containerStyle, className),
		[containerStyle, className],
	);

	if (animated) {
		return (
			<motion.div className={containerStyles} style={style} {...rest}>
				{children}
			</motion.div>
		);
	}

	return (
		<div className={containerStyles} style={style} {...rest}>
			{children}
		</div>
	);
};

export default Container;
