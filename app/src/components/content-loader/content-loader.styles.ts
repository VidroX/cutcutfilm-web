export enum ContentLoaderStyle {
	Blue,
	Accent,
	Yellow,
	Green,
}

interface ContentLoaderColors {
	innerLoaderColor: string;
	outerLoaderColor: string;
	contentColor: string;
}

const styleMap: Record<ContentLoaderStyle, ContentLoaderColors> = {
	[ContentLoaderStyle.Blue]: {
		innerLoaderColor: 'hsl(var(--twc-black))',
		outerLoaderColor: 'hsl(var(--twc-secondary-300))',
		contentColor: 'hsl(var(--twc-blue))',
	},
	[ContentLoaderStyle.Accent]: {
		innerLoaderColor: 'hsl(var(--twc-black))',
		outerLoaderColor: 'hsl(var(--twc-secondary-300))',
		contentColor: 'hsl(var(--twc-accent))',
	},
	[ContentLoaderStyle.Yellow]: {
		innerLoaderColor: 'hsl(var(--twc-black))',
		outerLoaderColor: 'hsl(var(--twc-secondary-300))',
		contentColor: 'hsl(var(--twc-yellow))',
	},
	[ContentLoaderStyle.Green]: {
		innerLoaderColor: 'hsl(var(--twc-black))',
		outerLoaderColor: 'hsl(var(--twc-secondary-300))',
		contentColor: 'hsl(var(--twc-green))',
	},
};

const getColorMap = (style: ContentLoaderStyle): ContentLoaderColors => styleMap[style];

export const ContentLoaderStyles = {
	getColorMap,
};
