export enum LinkStyle {
	Primary,
}

const sharedStyles: string[] = [
	'font-medium',
	'hover:underline',
	'focus:underline',
	'active:no-underline',
	'decoration-solid',
	'decoration-1',
];

const styleMap: Record<LinkStyle, string[]> = {
	[LinkStyle.Primary]: [
		...sharedStyles,
		'text-text-primary',
		'focus:text-secondary',
		'hover:text-secondary',
		'active:text-primary',
	],
};

const composeStyles = (style: LinkStyle, additionalStyles: string = ''): string =>
	[...styleMap[style], additionalStyles].join(' ');

export const LinkStyles = {
	composeStyles,
};
