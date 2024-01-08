export enum ContainerStyle {
	Primary,
	Accent,
	Blue,
	Basic,
}

const sharedStyles: string[] = ['rounded-2xl', 'border', 'border-black', 'overflow-hidden'];

const styleMap: Record<ContainerStyle, string[]> = {
	[ContainerStyle.Primary]: [
		...sharedStyles,
		'shadow-container',
		'shadow-secondary-300',
		'bg-background',
	],
	[ContainerStyle.Accent]: [...sharedStyles, 'shadow-container', 'shadow-accent', 'bg-accent'],
	[ContainerStyle.Blue]: [...sharedStyles, 'shadow-container', 'shadow-blue', 'bg-blue'],
	[ContainerStyle.Basic]: [...sharedStyles, 'bg-background'],
};

const composeStyles = (style: ContainerStyle, additionalStyles: string = ''): string =>
	[...styleMap[style], additionalStyles].join(' ');

export const ContainerStyles = {
	composeStyles,
};
