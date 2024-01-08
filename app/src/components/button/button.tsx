import { ReactNode, useMemo } from 'react';
import { ButtonSize, ButtonStyle, ButtonStyles } from '@/components/button/button.styles';
import { motion } from 'framer-motion';
import Spinner from '@/components/spinner';

type Props = {
	loading?: boolean;
	animated?: boolean;
	expanded?: boolean;
	buttonStyle?: ButtonStyle;
	buttonSize?: ButtonSize;
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	type?: 'submit' | 'reset' | 'button';
	onClick?(): void;
};

const Button = ({
	loading = false,
	animated = false,
	expanded = false,
	className = '',
	disabled = false,
	buttonStyle = ButtonStyle.Primary,
	buttonSize = ButtonSize.Medium,
	type = 'button',
	onClick,
	children,
}: Props) => {
	const { styles: buttonStyles, textColor } = useMemo(
		() => ButtonStyles.composeStyles(buttonStyle, className, buttonSize),
		[buttonSize, buttonStyle, className],
	);

	if (animated) {
		return (
			<motion.button
				onClick={!loading ? onClick : undefined}
				className={`${buttonStyles}${expanded ? ' w-full' : ''}`}
				disabled={disabled}
				type={type}>
				{loading && <Spinner size={24} color={textColor} />}
				{!loading && children}
			</motion.button>
		);
	}

	return (
		<button
			onClick={!loading ? onClick : undefined}
			className={`${buttonStyles}${expanded ? ' w-full' : ''}`}
			disabled={disabled}
			type={type}>
			{loading && <Spinner size={24} color={textColor} />}
			{!loading && children}
		</button>
	);
};

export default Button;
