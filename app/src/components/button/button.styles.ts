export enum ButtonStyle {
	Primary,
	Secondary,
	White,
	Green,
	Outlined,
	Text,
	Transparent,
}

export enum ButtonSize {
	Small,
	Medium,
	Large,
	SymmetricSmall,
	SymmetricMedium,
	SymmetricLarge,
	None,
}

interface TextColorAwareStyles {
	styles: string[];
	textColor: string;
}

interface ComposedButtonStyles {
	styles: string;
	textColor: string;
}

const sharedStyles: string[] = [
	'outline-none',
	'rounded-button',
	'duration-150',
	'disabled:shadow-none',
	'text-center',
	'justify-center',
	'items-center',
	'shadow-secondary-300',
];

const styleMap: Record<ButtonStyle, TextColorAwareStyles> = {
	[ButtonStyle.Primary]: {
		styles: [
			...sharedStyles,
			'bg-primary',
			'text-text-secondary',
			'hover:shadow-button',
			'focus:shadow-button',
			'active:shadow-button-active',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-secondary))',
	},
	[ButtonStyle.Secondary]: {
		styles: [
			...sharedStyles,
			'bg-secondary',
			'text-text-secondary',
			'hover:shadow-button',
			'focus:shadow-button',
			'active:shadow-button-active',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-secondary))',
	},
	[ButtonStyle.Outlined]: {
		styles: [
			...sharedStyles,
			'bg-transparent',
			'border',
			'border-primary',
			'text-text-primary',
			'hover:shadow-button',
			'focus:shadow-button',
			'active:shadow-button-active',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-primary))',
	},
	[ButtonStyle.White]: {
		styles: [
			...sharedStyles,
			'bg-black-50',
			'text-text-primary',
			'hover:shadow-button',
			'focus:shadow-button',
			'active:shadow-button-active',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-primary))',
	},
	[ButtonStyle.Green]: {
		styles: [
			...sharedStyles,
			'bg-green',
			'text-text-primary',
			'hover:shadow-button',
			'focus:shadow-button',
			'active:shadow-button-active',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-primary))',
	},
	[ButtonStyle.Text]: {
		styles: [
			...sharedStyles,
			'bg-transparent',
			'text-text-primary',
			'active:text-secondary',
			'decoration-solid',
			'decoration-2',
			'hover:underline',
			'focus:underline',
			'font-bold',
		],
		textColor: 'hsl(var(--twc-text-primary))',
	},
	[ButtonStyle.Transparent]: {
		styles: [...sharedStyles, 'bg-transparent', 'text-text-primary'],
		textColor: 'hsl(var(--twc-text-primary))',
	},
};

const sizeMap: Record<ButtonSize, string[]> = {
	[ButtonSize.Small]: ['py-2', 'px-4'],
	[ButtonSize.Medium]: ['py-3', 'px-6'],
	[ButtonSize.Large]: ['py-4', 'px-8'],
	[ButtonSize.SymmetricSmall]: ['p-small'],
	[ButtonSize.SymmetricMedium]: ['p-4'],
	[ButtonSize.SymmetricLarge]: ['p-8'],
	[ButtonSize.None]: [],
};

const composeStyles = (
	style: ButtonStyle,
	additionalStyles: string = '',
	size: ButtonSize = ButtonSize.Medium,
): ComposedButtonStyles => ({
	styles: [...styleMap[style].styles, ...sizeMap[size], additionalStyles].join(' '),
	textColor: styleMap[style].textColor,
});

export const ButtonStyles = {
	composeStyles,
};
