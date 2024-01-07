import { useMemo } from 'react';
import { AvatarSize, AvatarStyle, AvatarStyles } from '@/components/avatar/avatar.styles';

type Props = {
	avatarStyle?: AvatarStyle;
	size?: AvatarSize;
	name: string;
	className?: string;
};

const Avatar = ({
	name,
	avatarStyle = AvatarStyle.Primary,
	size = AvatarSize.Medium,
	className = '',
}: Props) => {
	const styles = useMemo(
		() => AvatarStyles.composeStyles(avatarStyle, size, className),
		[avatarStyle, size, className],
	);

	return <div className={styles}>{name?.slice(0, 2)?.toLocaleUpperCase() ?? ''}</div>;
};

export default Avatar;
