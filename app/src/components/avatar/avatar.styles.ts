export enum AvatarStyle {
	Primary,
}

export enum AvatarSize {
	Small,
	Medium,
	Large,
}

const sharedStyles: string[] = [
	'flex',
	'items-center',
	'justify-center',
	'rounded-full',
	'text-center',
];

const styleMap: Record<AvatarStyle, string[]> = {
	[AvatarStyle.Primary]: [...sharedStyles, 'bg-secondary-750', 'text-text-secondary'],
};

const sizeMap: Record<AvatarSize, string[]> = {
	[AvatarSize.Small]: ['h-8', 'w-8'],
	[AvatarSize.Medium]: ['h-11', 'w-11'],
	[AvatarSize.Large]: ['h-14', 'w-14'],
};

const composeStyles = (
	style: AvatarStyle = AvatarStyle.Primary,
	size: AvatarSize = AvatarSize.Medium,
	additionalStyles: string = '',
): string => [...styleMap[style], ...sizeMap[size], additionalStyles].join(' ');

export const AvatarStyles = {
	composeStyles,
};
