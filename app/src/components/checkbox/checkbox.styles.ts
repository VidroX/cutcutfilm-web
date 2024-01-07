export enum CheckboxStyle {
	Primary,
}

export enum CheckboxSize {
	Small,
	Medium,
	Large,
}

const sharedStyles: string[] = [
	'outline-none',
	'duration-150',
	'cursor-pointer',
	'rounded',
	'border-primary',
	'border-2',
	'focus:ring-0',
	'focus:ring-offset-0',
	'focus:shadow-none',
	'bg-background',
];

const styleMap: Record<CheckboxStyle, string[]> = {
	[CheckboxStyle.Primary]: [
		...sharedStyles,
		'accent-secondary',
		'text-secondary',
		'checked:border-secondary',
	],
};

const sizeMap: Record<CheckboxSize, string[]> = {
	[CheckboxSize.Small]: ['w-4', 'h-4'],
	[CheckboxSize.Medium]: ['w-[1.125rem]', 'h-[1.125rem]'],
	[CheckboxSize.Large]: ['w-[1.5rem]', 'h-[1.5rem]'],
};

const composeStyles = (style: CheckboxStyle, size: CheckboxSize = CheckboxSize.Medium): string =>
	[...styleMap[style], ...sizeMap[size]].join(' ');

export const CheckboxStyles = {
	composeStyles,
};
