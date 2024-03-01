import { Link as NextLink } from '@/navigation';
import { ReactNode, useMemo } from 'react';
import { LinkStyle, LinkStyles } from '@/components/link/link.styles';

type Props = {
	linkStyle?: LinkStyle;
	onClick?(): void;
	className?: string;
	scroll?: boolean;
	children: ReactNode;
	href: string;
};

const Link = ({
	onClick,
	className = '',
	linkStyle = LinkStyle.Primary,
	scroll = true,
	children,
	href,
}: Props) => {
	const linkStyles = useMemo(
		() => LinkStyles.composeStyles(linkStyle, className),
		[linkStyle, className],
	);

	if (href.includes('#')) {
		return (
			<a onClick={onClick} href={href} className={linkStyles}>
				{children}
			</a>
		);
	}

	return (
		<NextLink scroll={scroll} onClick={onClick} href={href} className={linkStyles}>
			{children}
		</NextLink>
	);
};

export default Link;
