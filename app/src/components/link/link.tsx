import { Link as NextLink } from '@/navigation';
import { ReactNode, useMemo } from 'react';
import { LinkStyle, LinkStyles } from '@/components/link/link.styles';

type Props = {
	linkStyle?: LinkStyle;
	onClick?(): void;
	className?: string;
	children: ReactNode;
	href: string;
};

const Link = ({
	onClick,
	className = '',
	linkStyle = LinkStyle.Primary,
	children,
	href,
}: Props) => {
	const linkStyles = useMemo(
		() => LinkStyles.composeStyles(linkStyle, className),
		[linkStyle, className],
	);

	return (
		<NextLink onClick={onClick} href={href} className={linkStyles}>
			{children}
		</NextLink>
	);
};

export default Link;
